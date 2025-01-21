---
layout: item
title: "Central Market Documentation Project"
reference_code: HK001-COMP001
file_id: HK001
date_range:
  start: 1960-06-15
  end: 1960-12-30
physical_description: "Multi-format documentation project including photographs, audio recordings, film footage, and architectural surveys"
location:
  lat: 22.284419
  lng: 114.154928
  address: "Queen's Road Central, Hong Kong"
  historic_name: "Central Market (中環街市)"

# Compound Object Structure
compound_object:
  type: "Mixed Media Documentation"
  components:
    photographs:
      count: 150
      formats: ["35mm negatives", "120mm film", "4x5 large format"]
      arrangement: "Arranged by location within market"
    audio:
      count: 25
      duration: "15 hours total"
      formats: ["1/4 inch tape", "wire recordings"]
    video:
      count: 8
      duration: "4 hours total"
      formats: ["16mm film", "8mm film"]
    documents:
      count: 200
      types: ["architectural drawings", "survey notes", "interviews"]
    3d_data:
      count: 12
      types: ["photogrammetry", "laser scans", "architectural models"]

# Component Details
components:
  photographs:
    - id: "PHT001"
      title: "Market Exterior View"
      date: "1960-06-15"
      format: "4x5 negative"
      media:
        type: "image"
        url: "/assets/images/market-exterior-1960.jpg"
        resolution: "4800 dpi"
    - id: "PHT002"
      title: "Market Interior Panorama"
      date: "1960-06-15"
      format: "120mm film"
      media:
        type: "image"
        url: "/assets/images/market-interior-1960.jpg"
        resolution: "4800 dpi"
  
  audio_recordings:
    - id: "AUD001"
      title: "Morning Market Sounds"
      date: "1960-07-20"
      duration: "45:20"
      media:
        type: "audio"
        url: "/assets/audio/morning-sounds-1960.mp3"
        format: "MP3/WAV"
    - id: "AUD002"
      title: "Vendor Interviews"
      date: "1960-07-21"
      duration: "1:30:15"
      media:
        type: "audio"
        url: "/assets/audio/vendor-interviews-1960.mp3"
        format: "MP3/WAV"
  
  video_footage:
    - id: "VID001"
      title: "Daily Operations"
      date: "1960-08-15"
      duration: "25:30"
      media:
        type: "video"
        url: "/assets/video/daily-operations-1960.mp4"
        format: "MP4/ProRes"
    - id: "VID002"
      title: "Special Events"
      date: "1960-09-01"
      duration: "15:45"
      media:
        type: "video"
        url: "/assets/video/special-events-1960.mp4"
        format: "MP4/ProRes"
  
  documents:
    - id: "DOC001"
      title: "Architectural Survey"
      date: "1960-06-20"
      format: "PDF/TIFF"
      media:
        type: "document"
        url: "/assets/documents/architectural-survey-1960.pdf"
    - id: "DOC002"
      title: "Interview Transcripts"
      date: "1960-07-25"
      format: "PDF/TXT"
      media:
        type: "document"
        url: "/assets/documents/interview-transcripts-1960.pdf"
  
  3d_scans:
    - id: "3D001"
      title: "Market External Structure"
      date: "1960-10-15"
      media:
        type: "3d"
        url: "/assets/3d/market-exterior-1960.glb"
        format: "GLB/OBJ"
    - id: "3D002"
      title: "Market Interior Spaces"
      date: "1960-10-16"
      media:
        type: "3d"
        url: "/assets/3d/market-interior-1960.glb"
        format: "GLB/OBJ"

# Relationships between Components
relationships:
  spatial:
    - component_ids: ["PHT001", "3D001"]
      relationship: "same_location"
      description: "Exterior photograph corresponds to 3D scan area"
    - component_ids: ["AUD001", "VID001"]
      relationship: "same_location"
      description: "Audio recording location matches video footage area"
  temporal:
    - component_ids: ["PHT001", "PHT002"]
      relationship: "same_day"
      description: "Photographs taken during same documentation session"
    - component_ids: ["AUD002", "DOC002"]
      relationship: "source_derivative"
      description: "Interview transcript derived from audio recording"

# Technical Specifications
technical_metadata:
  digitization:
    photographs:
      equipment: "Heidelberg Tango Drum Scanner"
      resolution: "4800 dpi"
      color_depth: "48-bit"
    audio:
      equipment: "Studer A820 tape deck"
      sampling: "96kHz/24bit"
    video:
      scanner: "Lasergraphics ScanStation"
      resolution: "4K"
    3d:
      equipment: "Leica RTC360 Scanner"
      point_density: "2mm @ 10m"

# Preservation Information
preservation:
  storage_locations:
    physical:
      photographs: "Cold storage, -4°C"
      audio_video: "Climate controlled vault"
      documents: "Archival storage boxes"
    digital:
      primary: "Enterprise NAS with redundancy"
      backup: "Cloud storage and LTO-9 tapes"
  condition_summary:
    photographs: "Excellent to Good"
    audio_video: "Good, some deterioration"
    documents: "Very Good"
    3d_data: "Excellent"

# Access Information
access:
  viewing_requirements:
    photographs: "Image viewer supporting TIFF format"
    audio: "MP3 player"
    video: "H.264 compatible video player"
    3d: "WebGL 2.0 compatible browser"
  accessibility:
    transcripts_available: true
    alt_text: true
    audio_description: true
    closed_captions: true
    languages: ["English", "Chinese Traditional", "Chinese Simplified"]

# Rights Management
rights:
  copyright_status: "Under copyright"
  copyright_holder: "Hong Kong Heritage Documentation Project"
  reproduction_rights: "Permission required for publication"
  credit_line: "Central Market Historical Archive"
  usage_restrictions:
    photographs: "Attribution required"
    audio_video: "Educational use only"
    3d: "Non-commercial use only"

# Project Context
project_context:
  purpose: "Comprehensive documentation of Central Market before renovation"
  methodology: "Multi-format documentation approach"
  funding: "Hong Kong Heritage Commission"
  project_team:
    - name: "John Smith"
      role: "Lead Photographer"
    - name: "Mary Wong"
      role: "Audio Engineer"
    - name: "David Chen"
      role: "3D Scanning Specialist"

subjects:
  - "Market architecture"
  - "Urban soundscapes"
  - "Commercial activities"
  - "Cultural heritage"
  - "Architectural preservation"

notes: >
  This comprehensive documentation project captures Central Market through
  multiple media formats, providing a complete record of the building's
  physical structure, daily operations, and social significance in 1960.
  The project serves as a model for multi-format heritage documentation.
---

A comprehensive documentation project of Hong Kong's Central Market,
combining photographs, audio recordings, film footage, architectural
drawings, and 3D scans. This multi-format collection provides a complete
record of the market's physical structure, daily operations, and social
significance in 1960, serving as a valuable resource for historical
research and heritage preservation.
