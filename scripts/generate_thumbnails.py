#!/usr/bin/env python3
import os
import sys
from PIL import Image
import fitz  # PyMuPDF for PDF handling
import cv2
import numpy as np
from pathlib import Path
import shutil
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ThumbnailGenerator:
    def __init__(self, source_dir, target_dir, size=(300, 300)):
        self.source_dir = Path(source_dir)
        self.target_dir = Path(target_dir)
        self.thumbnail_size = size
        self.supported_images = {'.jpg', '.jpeg', '.png', '.tiff', '.tif'}
        self.supported_pdfs = {'.pdf'}
        self.supported_videos = {'.mp4', '.mov'}

    def create_thumbnail_dir(self, file_path):
        """Create thumbnail directory structure matching source"""
        rel_path = file_path.relative_to(self.source_dir).parent
        thumb_dir = self.target_dir / rel_path
        thumb_dir.mkdir(parents=True, exist_ok=True)
        return thumb_dir

    def generate_image_thumbnail(self, image_path):
        """Generate thumbnail for image files"""
        try:
            with Image.open(image_path) as img:
                # Convert RGBA to RGB if necessary
                if img.mode in ('RGBA', 'LA'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1])
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                img.thumbnail(self.thumbnail_size)
                thumb_dir = self.create_thumbnail_dir(image_path)
                thumb_path = thumb_dir / f"{image_path.stem}_thumb.jpg"
                img.save(thumb_path, 'JPEG', quality=85)
                logger.info(f"Created thumbnail for image: {image_path.name}")
                return thumb_path
        except Exception as e:
            logger.error(f"Error processing image {image_path}: {str(e)}")
            return None

    def generate_pdf_thumbnail(self, pdf_path):
        """Generate thumbnail for PDF files"""
        try:
            doc = fitz.open(pdf_path)
            # Get the first page
            page = doc[0]
            # Convert page to image
            pix = page.get_pixmap()
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            img.thumbnail(self.thumbnail_size)
            
            thumb_dir = self.create_thumbnail_dir(pdf_path)
            thumb_path = thumb_dir / f"{pdf_path.stem}_thumb.jpg"
            img.save(thumb_path, 'JPEG', quality=85)
            doc.close()
            logger.info(f"Created thumbnail for PDF: {pdf_path.name}")
            return thumb_path
        except Exception as e:
            logger.error(f"Error processing PDF {pdf_path}: {str(e)}")
            return None

    def generate_video_thumbnail(self, video_path):
        """Generate thumbnail for video files"""
        try:
            # Open video file
            cap = cv2.VideoCapture(str(video_path))
            
            # Get total frames
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            
            # Read frame from middle of video
            cap.set(cv2.CAP_PROP_POS_FRAMES, total_frames // 2)
            ret, frame = cap.read()
            
            if ret:
                # Convert BGR to RGB
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(frame_rgb)
                img.thumbnail(self.thumbnail_size)
                
                thumb_dir = self.create_thumbnail_dir(video_path)
                thumb_path = thumb_dir / f"{video_path.stem}_thumb.jpg"
                img.save(thumb_path, 'JPEG', quality=85)
                logger.info(f"Created thumbnail for video: {video_path.name}")
                return thumb_path
            
            cap.release()
        except Exception as e:
            logger.error(f"Error processing video {video_path}: {str(e)}")
            return None

    def process_file(self, file_path):
        """Process a single file based on its extension"""
        extension = file_path.suffix.lower()
        
        if extension in self.supported_images:
            return self.generate_image_thumbnail(file_path)
        elif extension in self.supported_pdfs:
            return self.generate_pdf_thumbnail(file_path)
        elif extension in self.supported_videos:
            return self.generate_video_thumbnail(file_path)
        else:
            logger.warning(f"Unsupported file type: {file_path}")
            return None

    def process_directory(self):
        """Process all files in the source directory"""
        for file_path in self.source_dir.rglob('*'):
            if file_path.is_file():
                self.process_file(file_path)

def main():
    if len(sys.argv) != 3:
        print("Usage: python generate_thumbnails.py <source_directory> <target_directory>")
        sys.exit(1)

    source_dir = sys.argv[1]
    target_dir = sys.argv[2]

    if not os.path.exists(source_dir):
        print(f"Error: Source directory '{source_dir}' does not exist")
        sys.exit(1)

    # Create target directory if it doesn't exist
    os.makedirs(target_dir, exist_ok=True)

    generator = ThumbnailGenerator(source_dir, target_dir)
    generator.process_directory()

if __name__ == "__main__":
    main()
