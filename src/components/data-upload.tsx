'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, Database, Zap, CheckCircle, AlertCircle, Target } from 'lucide-react';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface DataUploadProps {
  onDataUploaded: (data: any) => void;
}

export function DataUpload({ onDataUploaded }: DataUploadProps): JSX.Element {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  }, []);

  const processFile = async (file: File): Promise<void> => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        let parsedData = null;

        // Parse based on file type
        if (file.name.toLowerCase().endsWith('.json')) {
          parsedData = JSON.parse(text);
        } else if (file.name.toLowerCase().endsWith('.csv')) {
          // Simple CSV parsing
          const lines = text.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(h => h.trim());
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row: Record<string, string> = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            return row;
          });
          parsedData = { headers, data };
        }

        // Complete upload
        setUploadProgress(100);
        setTimeout(() => {
          setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          });
          setIsUploading(false);
          clearInterval(progressInterval);
          
          // Call the callback with parsed data
          onDataUploaded({
            file: {
              name: file.name,
              size: file.size,
              type: file.type
            },
            data: parsedData,
            rowCount: Array.isArray(parsedData?.data) ? parsedData.data.length : 
                     Array.isArray(parsedData) ? parsedData.length : 1,
            columns: parsedData?.headers || (typeof parsedData === 'object' ? Object.keys(parsedData) : [])
          });
        }, 500);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsUploading(false);
      clearInterval(progressInterval);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const supportedFormats = [
    {
      extension: 'CSV',
      description: 'Comma-Separated Values',
      icon: FileText,
      color: 'text-purple-300'
    },
    {
      extension: 'JSON', 
      description: 'JavaScript Object Notation',
      icon: Database,
      color: 'text-white'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Space Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="space-icon-container-primary space-glow-cycle">
            <Upload className="w-8 h-8" />
          </div>
          <h2 className="space-title-lg font-space-primary space-text-gradient-nebula">
            Data Launch Pod
          </h2>
        </div>
        <p className="space-body max-w-3xl mx-auto">
          Launch your CSV or JSON files into our cosmic data processing system for deep space analysis
        </p>
      </div>

      {/* Space Upload Area */}
      <div className="space-card-elevated space-card-padding">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-3xl p-16 text-center space-smooth-transition
            ${dragActive
              ? 'border-purple-400 bg-gradient-to-br from-purple-500/15 to-blue-500/10 space-border-glow space-exploration'
              : uploadedFile
                ? 'border-white bg-gradient-to-br from-white/10 to-purple-500/10 space-glow-cycle'
                : 'border-gray-600 space-surface-elevated hover:border-purple-400/50 hover:bg-gradient-to-br hover:from-purple-500/8 hover:to-blue-500/8'
            }
          `}
        >
          <div className="relative z-10">
            {isUploading ? (
              <div className="space-y-8">
                {/* Space Upload Animation */}
                <div className="relative mx-auto w-32 h-32">
                  <div className="absolute inset-0 space-surface-elevated rounded-3xl border-2 border-gray-600" />
                  <div className="absolute inset-2 space-icon-container-primary rounded-3xl space-loading-spinner space-glow-cycle" />
                  <div className="absolute inset-8 flex items-center justify-center">
                    <Upload className="w-16 h-16 text-white space-pulse" />
                  </div>
                  
                  {/* Space Upload Particles */}
                  <div className="absolute inset-0 space-float">
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-2 space-twinkle" />
                    <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-white rounded-full transform translate-x-1/2 translate-y-2 space-float" />
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-300 rounded-full transform translate-x-2 -translate-y-1/2 space-twinkle" />
                  </div>
                </div>

                {/* Space Progress Bar */}
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="space-caption text-purple-300">Launching Data</span>
                    <span className="space-caption text-purple-300">{uploadProgress}%</span>
                  </div>
                  <div className="space-progress-container">
                    <div 
                      className="space-progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>

                <p className="space-body-sm">Transporting your data through the cosmic network...</p>
              </div>
            ) : uploadedFile ? (
              <div className="space-y-8">
                {/* Space Success State */}
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 space-icon-container-success rounded-3xl space-pulse border-4 border-teal-400/30" />
                  <CheckCircle className="w-16 h-16 text-white relative z-10" />
                  
                  {/* Space Success Particles */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full space-twinkle" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 bg-white rounded-full space-twinkle" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-400 rounded-full space-twinkle" style={{ animationDelay: '1s' }} />
                  </div>
                </div>

                {/* Space File Info */}
                <div className="space-card max-w-lg mx-auto space-card-padding border border-teal-400/30">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0 space-icon-container space-hover">
                      <FileText className="w-8 h-8 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="space-title truncate text-teal-400">{uploadedFile.name}</p>
                      <p className="space-body-sm text-gray-300">{formatFileSize(uploadedFile.size)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <span className="space-badge space-badge-success space-pulse">Data Successfully Launched!</span>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Space Upload Icon - POSITIONED ABOVE TEXT */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32">
                    <div className={`w-full h-full rounded-3xl space-smooth-transition flex items-center justify-center ${
                      dragActive ? 'space-icon-container-primary space-glow-cycle space-exploration' : 'space-icon-container space-hover'
                    }`}>
                      <Upload className={`w-16 h-16 space-smooth-transition ${
                        dragActive ? 'text-white space-pulse' : 'text-purple-300'
                      }`} />
                    </div>
                    
                    {/* Space Floating Upload Particles */}
                    {!dragActive && (
                      <div className="absolute inset-0 space-float pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-70 space-twinkle" />
                        <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-white rounded-full opacity-50 space-float" />
                        <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-60 space-twinkle" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Space Text Content - POSITIONED BELOW ICON */}
                <div className="text-center space-y-6">
                  <h3 className="space-subtitle space-text-gradient-nebula font-space-primary">
                    {dragActive ? 'Release to Launch' : 'Launch Dataset'}
                  </h3>
                  <p className="space-body">
                    Drag and drop your data files into the launch bay, or browse to select files
                  </p>
                  
                  {/* Space File Input */}
                  <div>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".csv,.json"
                      onChange={handleFileSelect}
                    />
                    <label
                      htmlFor="file-upload"
                      className="space-btn-primary cursor-pointer inline-block"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Space scanning effect */}
          {dragActive && (
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent space-shimmer" />
            </div>
          )}
        </div>
      </div>

      {/* Space Supported Formats */}
      <div className="space-card space-card-padding">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="space-icon-container space-hover">
              <Target className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-star">
              Compatible Data Formats
            </h3>
          </div>
          <p className="space-body-sm">Advanced parsing systems for these cosmic data formats</p>
        </div>

        <div className="space-grid-cards">
          {supportedFormats.map((format) => {
            const Icon = format.icon;
            return (
              <div 
                key={format.extension}
                className="space-card space-card-padding space-hover border border-gray-700 space-exploration"
              >
                <div className="flex items-center space-x-6">
                  <div className="space-icon-container space-hover">
                    <Icon className={`w-8 h-8 ${format.color}`} />
                  </div>
                  <div>
                    <div className="font-space-primary font-bold text-xl text-white mb-2">.{format.extension}</div>
                    <div className="space-body-sm">{format.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Space Processing Capabilities */}
      <div className="space-card space-card-padding">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="space-icon-container-accent space-float">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-nebula">
              Cosmic Data Processing
            </h3>
          </div>
          <p className="space-body-sm">Advanced stellar algorithms for comprehensive data transformation</p>
        </div>

        <div className="space-grid-stats">
          {[
            { icon: Zap, title: 'Stellar Analysis', desc: 'Comprehensive data quality assessment across cosmic dimensions' },
            { icon: Database, title: 'Structure Mapping', desc: 'Deep exploration of data architecture and relationships' },
            { icon: CheckCircle, title: 'Cosmic Validation', desc: 'Space-grade data validation and verification protocols' },
            { icon: AlertCircle, title: 'Anomaly Detection', desc: 'Intelligent identification of data anomalies and outliers' },
            { icon: FileText, title: 'Format Harmonization', desc: 'Stellar standards compliance and best practices' },
            { icon: Target, title: 'Performance Optimization', desc: 'Cosmic-level performance tuning and efficiency improvements' }
          ].map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div key={index} className="space-surface-elevated p-6 rounded-xl space-hover border border-gray-700 space-exploration">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 space-icon-container">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-space-secondary font-semibold space-body mb-2 text-white">{capability.title}</div>
                    <div className="space-body-sm">{capability.desc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
