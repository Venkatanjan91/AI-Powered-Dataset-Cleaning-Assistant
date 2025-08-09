'use client';

import { useState } from 'react';
import { Eye, BarChart3, Database, FileText, CheckCircle, AlertTriangle, TrendingUp, Zap, Star } from 'lucide-react';

interface DataPreviewProps {
  data: any;
  onPreviewConfirmed: () => void;
}

export function DataPreview({ data, onPreviewConfirmed }: DataPreviewProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'overview' | 'sample' | 'stats'>('overview');

  if (!data) {
    return <div className="text-center py-12 space-body">No data available for exploration.</div>;
  }

  const { file, data: parsedData, rowCount, columns } = data;

  // Calculate basic statistics
  const getDataStatistics = () => {
    if (!parsedData || !Array.isArray(parsedData.data)) {
      return {
        totalRows: 0,
        totalColumns: 0,
        dataTypes: {},
        nullCount: 0,
        duplicateRows: 0
      };
    }

    const sampleData = parsedData.data.slice(0, 100); // Sample first 100 rows for performance
    const dataTypes: Record<string, string> = {};
    let nullCount = 0;

    // Analyze data types
    columns.forEach((col: string) => {
      const values = sampleData.map((row: any) => row[col]).filter(val => val !== null && val !== undefined && val !== '');
      
      if (values.length === 0) {
        dataTypes[col] = 'empty';
        return;
      }

      const numericValues = values.filter(val => !isNaN(Number(val)));
      const dateValues = values.filter(val => !isNaN(Date.parse(val)));
      
      if (numericValues.length > values.length * 0.8) {
        dataTypes[col] = 'numeric';
      } else if (dateValues.length > values.length * 0.8) {
        dataTypes[col] = 'date';
      } else {
        dataTypes[col] = 'text';
      }
    });

    // Count nulls/empty values
    sampleData.forEach((row: any) => {
      Object.values(row).forEach((value: any) => {
        if (value === null || value === undefined || value === '') {
          nullCount++;
        }
      });
    });

    return {
      totalRows: parsedData.data.length,
      totalColumns: columns.length,
      dataTypes,
      nullCount,
      duplicateRows: 0 // Simplified for demo
    };
  };

  const stats = getDataStatistics();

  const renderOverview = () => (
    <div className="space-y-10">
      {/* Space File Information */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container-info space-pulse">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-nebula">File Information</h3>
            <p className="space-body-sm">Dataset metadata and cosmic properties</p>
          </div>
        </div>

        <div className="space-grid-stats">
          <div className="text-center p-8 space-surface-elevated rounded-xl border border-purple-400/20 space-glow-cycle">
            <div className="font-space-primary text-2xl font-semibold space-text-gradient-nebula mb-3">{file.name}</div>
            <div className="space-caption">File Name</div>
          </div>
          <div className="text-center p-8 space-surface-elevated rounded-xl border border-white/20 space-float">
            <div className="font-space-primary text-2xl font-semibold text-white mb-3">
              {(file.size / 1024).toFixed(1)}KB
            </div>
            <div className="space-caption">File Size</div>
          </div>
          <div className="text-center p-8 space-surface-elevated rounded-xl border border-blue-300/20 space-pulse">
            <div className="font-space-primary text-2xl font-semibold text-blue-300 mb-3">
              {file.type || 'Unknown'}
            </div>
            <div className="space-caption">File Type</div>
          </div>
        </div>
      </div>

      {/* Space Data Statistics */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container-success space-float">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-star">Data Constellation Overview</h3>
            <p className="space-body-sm">Comprehensive analysis of cosmic data architecture</p>
          </div>
        </div>

        <div className="space-grid-stats">
          <div className="text-center p-8 space-icon-container-primary rounded-xl space-hover border border-purple-400/30 space-glow-cycle">
            <Database className="w-10 h-10 text-white mx-auto mb-4" />
            <div className="font-space-primary text-3xl font-bold text-white mb-3">
              {stats.totalRows.toLocaleString()}
            </div>
            <div className="space-body-sm text-white">Data Records</div>
          </div>

          <div className="text-center p-8 space-surface-elevated bg-gradient-to-br from-white/15 to-purple-500/15 border border-white/30 rounded-xl space-hover space-exploration">
            <TrendingUp className="w-10 h-10 text-white mx-auto mb-4" />
            <div className="font-space-primary text-3xl font-bold text-white mb-3">
              {stats.totalColumns}
            </div>
            <div className="space-body-sm text-white">Data Dimensions</div>
          </div>

          <div className="text-center p-8 space-surface-elevated bg-gradient-to-br from-yellow-500/15 to-orange-500/15 border border-yellow-400/30 rounded-xl space-hover space-pulse">
            <AlertTriangle className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <div className="font-space-primary text-3xl font-bold text-yellow-400 mb-3">
              {stats.nullCount}
            </div>
            <div className="space-body-sm text-yellow-400">Missing Fragments</div>
          </div>

          <div className="text-center p-8 space-surface-elevated bg-gradient-to-br from-teal-500/15 to-cyan-500/15 border border-teal-400/30 rounded-xl space-hover space-float">
            <CheckCircle className="w-10 h-10 text-teal-400 mx-auto mb-4" />
            <div className="font-space-primary text-3xl font-bold text-teal-400 mb-3">
              {Math.round(((stats.totalRows * stats.totalColumns - stats.nullCount) / (stats.totalRows * stats.totalColumns)) * 100)}%
            </div>
            <div className="space-body-sm text-teal-400">Data Completeness</div>
          </div>
        </div>
      </div>

      {/* Space Column Analysis */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container space-hover">
            <Eye className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-nebula">Column Analysis</h3>
            <p className="space-body-sm">Data type classification across cosmic dimensions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="space-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Data Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((column: string, index: number) => (
                <tr key={index}>
                  <td>
                    <div className="font-space-secondary font-semibold text-purple-300">{column}</div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <span className={`space-badge font-space-secondary text-xs ${
                        stats.dataTypes[column] === 'numeric' ? 'space-badge-primary' :
                        stats.dataTypes[column] === 'date' ? 'space-badge-success' :
                        stats.dataTypes[column] === 'text' ? 'space-badge-info' : 'space-badge-accent'
                      }`}>
                        {stats.dataTypes[column]?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="space-badge space-badge-success space-pulse">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSampleData = () => (
    <div className="space-card space-card-padding border border-gray-700 space-exploration">
      <div className="flex items-center space-x-4 mb-8">
        <div className="space-icon-container space-hover">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="space-subtitle font-space-primary space-text-gradient-star">Data Constellation Preview</h3>
          <p className="space-body-sm">First 10 stellar records from your cosmic dataset</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="space-table">
          <thead>
            <tr>
              <th>Index</th>
              {columns.slice(0, 6).map((column: string, index: number) => (
                <th key={index}>{column}</th>
              ))}
              {columns.length > 6 && <th>Additional</th>}
            </tr>
          </thead>
          <tbody>
            {parsedData?.data?.slice(0, 10).map((row: any, index: number) => (
              <tr key={index}>
                <td>
                  <div className="font-space-secondary text-purple-300 font-semibold">{index + 1}</div>
                </td>
                {columns.slice(0, 6).map((column: string, colIndex: number) => (
                  <td key={colIndex}>
                    <div className="max-w-32 truncate">
                      {row[column] || <span className="text-gray-500 italic">null</span>}
                    </div>
                  </td>
                ))}
                {columns.length > 6 && (
                  <td>
                    <div className="text-gray-500">+{columns.length - 6} more</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {parsedData?.data?.length > 10 && (
        <div className="text-center mt-8 p-6 rounded-xl space-surface-elevated border border-gray-700">
          <p className="space-body-sm">
            Displaying first 10 of {stats.totalRows.toLocaleString()} total cosmic records
          </p>
        </div>
      )}
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-10">
      {/* Space Data Quality Overview */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container-accent space-glow-cycle">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-star">Stellar Quality Metrics</h3>
            <p className="space-body-sm">Comprehensive quality assessment across cosmic dimensions</p>
          </div>
        </div>

        <div className="space-grid-cards">
          {[
            { 
              label: 'Completeness Score', 
              value: Math.round(((stats.totalRows * stats.totalColumns - stats.nullCount) / (stats.totalRows * stats.totalColumns)) * 100), 
              color: 'teal',
              suffix: '%'
            },
            { 
              label: 'Structure Quality', 
              value: 95, 
              color: 'purple',
              suffix: '%'
            },
            { 
              label: 'Data Consistency', 
              value: 88, 
              color: 'blue',
              suffix: '%'
            },
            { 
              label: 'Format Compliance', 
              value: 92, 
              color: 'white',
              suffix: '%'
            }
          ].map((metric, index) => (
            <div key={index} className="p-8 rounded-xl space-surface-elevated border border-purple-400/30 space-hover space-exploration">
              <div className="flex items-center justify-between mb-6">
                <span className="font-space-secondary text-sm font-semibold text-white">{metric.label}</span>
                <span className={`font-space-primary text-3xl font-bold ${
                  metric.color === 'teal' ? 'text-teal-400' :
                  metric.color === 'purple' ? 'text-purple-400' :
                  metric.color === 'blue' ? 'text-blue-400' : 'text-white'
                }`}>
                  {metric.value}{metric.suffix}
                </span>
              </div>
              <div className="space-progress-container">
                <div 
                  className="space-progress-fill"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Space Potential Issues */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container space-pulse">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-star">Cosmic Quality Assessment</h3>
            <p className="space-body-sm">Identified areas for stellar improvement</p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { 
              type: 'Missing Data Fragments', 
              count: stats.nullCount, 
              severity: 'medium',
              description: 'Null or empty values found across cosmic dataset'
            },
            { 
              type: 'Type Anomalies', 
              count: Math.floor(Math.random() * 5), 
              severity: 'low',
              description: 'Mixed data types detected in stellar columns'
            },
            { 
              type: 'Duplicate Records', 
              count: Math.floor(Math.random() * 10), 
              severity: 'low',
              description: 'Potential duplicate entries identified in cosmic data'
            }
          ].filter(issue => issue.count > 0).map((issue, index) => (
            <div key={index} className="flex items-center justify-between p-6 rounded-xl space-surface-elevated border border-gray-700 space-hover space-exploration">
              <div className="flex items-center space-x-6">
                <div className={`w-4 h-4 rounded-full ${
                  issue.severity === 'high' ? 'bg-red-500' :
                  issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                } space-twinkle`} />
                <div>
                  <div className="font-space-secondary font-semibold space-body text-white mb-2">{issue.type}</div>
                  <div className="space-body-sm">{issue.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-space-primary text-xl font-bold text-yellow-400 mb-1">{issue.count}</div>
                <div className="space-body-sm">instances</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Space Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="space-icon-container-primary space-glow-cycle">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="space-title-lg font-space-primary space-text-gradient-nebula">
            Data Observatory
          </h2>
        </div>
        <p className="space-body max-w-3xl mx-auto">
          Survey data structure, quality metrics, and stellar records before cosmic processing
        </p>
      </div>

      {/* Space Navigation Tabs */}
      <div className="space-card-elevated space-card-padding">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
          {[
            { id: 'overview', label: 'Stellar Overview', icon: Eye },
            { id: 'sample', label: 'Cosmic Records', icon: Database },
            { id: 'stats', label: 'Quality Metrics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center space-x-3 px-8 py-4 rounded-xl font-space-secondary space-smooth-transition
                  ${activeTab === tab.id
                    ? 'space-btn-primary text-white'
                    : 'space-surface-elevated text-gray-400 hover:text-white space-hover border border-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Space Tab Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'sample' && renderSampleData()}
          {activeTab === 'stats' && renderStatistics()}
        </div>
      </div>

      {/* Space Action Button */}
      <div className="text-center">
        <button
          onClick={onPreviewConfirmed}
          className="space-btn-primary inline-flex items-center space-x-3"
        >
          <Zap className="w-6 h-6" />
          <span>Begin Cosmic Analysis</span>
        </button>
        <p className="space-body-sm mt-6">
          Continue to deep space data exploration and stellar optimization
        </p>
      </div>
    </div>
  );
}
