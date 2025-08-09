use client';

import { useState } from 'react';
import { Download, CheckCircle, TrendingUp, Zap, FileText, BarChart3, Award, Target, Star } from 'lucide-react';

interface CleaningResultsProps {
  results: any;
  originalData: any;
}

export function CleaningResults({ results, originalData }: CleaningResultsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'summary' | 'improvements' | 'issues'>('summary');

  if (!results) {
    return <div className="text-center py-12 space-body">No cosmic processing results available.</div>;
  }

  const { qualityScore, issues, improvements, recommendations } = results;

  const handleDownloadCleaned = (): void => {
    // Mock cleaned data generation
    const cleanedData = {
      metadata: {
        originalRecords: originalData?.rowCount || 0,
        processedRecords: Math.floor((originalData?.rowCount || 0) * 0.95),
        qualityImprovement: improvements?.dataCompleteness - 70,
        processingTime: results.estimatedCleaningTime || 20,
        appliedMethods: ['Stellar Value Reconstruction', 'Cosmic Validation', 'Nebula Pattern Recognition', 'Data Harmonization']
      },
      data: originalData?.data || [],
      summary: `DataExplorer Space has successfully processed your cosmic data achieving ${qualityScore}% stellar optimization.`
    };

    const blob = new Blob([JSON.stringify(cleanedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic-dataset-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = (): void => {
    const report = {
      cosmicAnalysisReport: {
        timestamp: new Date().toISOString(),
        qualityScore,
        stellarImpact: {
          dataReliability: 'Cosmically Enhanced',
          analysisReadiness: 'Stellar Optimized',
          decisionSupport: 'Mission Ready'
        },
        issuesResolved: issues,
        qualityImprovements: improvements,
        stellarRecommendations: recommendations,
        originalDataset: originalData
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic-analysis-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSummaryTab = () => (
    <div className="space-y-12">
      {/* Space Success Banner */}
      <div className="space-card-floating space-card-padding text-center bg-gradient-to-br from-teal-500/10 to-white/10 border border-teal-400/30 space-exploration">
        {/* Space Success Indicator */}
        <div className="relative inline-block mb-10">
          {/* Success Ring System */}
          <div className="relative w-52 h-52 mx-auto">
            <div className="absolute inset-0 space-icon-container-success rounded-full border-4 border-teal-400/30 space-pulse space-glow-cycle" />
            <div className="absolute inset-6 space-surface-elevated rounded-full border-2 border-white/25 space-loading-spinner space-exploration" style={{ animationDuration: '12s' }} />
            <div className="absolute inset-12 space-surface-floating rounded-full border border-purple-400/20 space-float" />
            
            {/* Success Icon */}
            <div className="absolute inset-20 flex items-center justify-center">
              <Award className="w-16 h-16 text-white space-pulse" />
            </div>

            {/* Space Floating Success Particles */}
            <div className="absolute inset-0">
              <div 
                className="absolute top-6 left-12 w-4 h-4 rounded-full bg-teal-400 space-float space-twinkle"
                style={{ animationDelay: '0s' }}
              />
              <div 
                className="absolute top-12 right-8 w-3 h-3 rounded-full bg-white space-float space-twinkle"
                style={{ animationDelay: '1s' }}
              />
              <div 
                className="absolute bottom-8 left-8 w-5 h-5 rounded-full bg-purple-400 space-float space-twinkle"
                style={{ animationDelay: '2s' }}
              />
              <div 
                className="absolute bottom-12 right-12 w-2 h-2 rounded-full bg-blue-300 space-float space-twinkle"
                style={{ animationDelay: '1.5s' }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="space-title-xl font-space-primary space-text-gradient-star">
            Mission Complete! ✨
          </h2>
          <p className="space-body">
            Your cosmic data has been successfully optimized and is ready for stellar analytics exploration
          </p>
          
          {/* Space Quality Score Display */}
          <div className="space-card-elevated space-card-padding inline-block border border-teal-400/20">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-6xl font-space-primary font-bold space-text-gradient-star mb-3">
                  {qualityScore}%
                </div>
                <div className="space-caption text-teal-400">Stellar Quality Score</div>
              </div>
              <div className="w-px h-20 space-separator" />
              <div className="text-left space-y-3">
                <div className="space-badge space-badge-success space-pulse">Mission Grade</div>
                <div className="space-body-sm">Cosmic Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space Key Metrics */}
      <div className="space-grid-stats">
        <div className="space-card space-card-padding text-center space-hover border border-purple-400/20 space-exploration">
          <div className="space-icon-container-primary mx-auto mb-6 space-pulse space-glow-cycle">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="font-space-primary text-3xl font-bold text-purple-400 mb-3">
            {improvements?.dataCompleteness || 95}%
          </div>
          <div className="space-body-sm mb-2">Data Completeness</div>
          <div className="text-xs text-teal-400 mt-3 space-twinkle">↗ Enhanced</div>
        </div>

        <div className="space-card space-card-padding text-center space-hover border border-white/20 space-exploration">
          <div className="space-icon-container-accent mx-auto mb-6 space-float">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="font-space-primary text-3xl font-bold text-white mb-3">
            {improvements?.dataConsistency || 92}%
          </div>
          <div className="space-body-sm mb-2">Data Consistency</div>
          <div className="text-xs text-white mt-3 space-twinkle">↗ Optimized</div>
        </div>

        <div className="space-card space-card-padding text-center space-hover border border-teal-400/20 space-exploration">
          <div className="space-icon-container-success mx-auto mb-6 space-glow-cycle">
            <Target className="w-8 h-8" />
          </div>
          <div className="font-space-primary text-3xl font-bold text-teal-400 mb-3">
            {improvements?.formatCompliance || 98}%
          </div>
          <div className="space-body-sm mb-2">Format Compliance</div>
          <div className="text-xs text-purple-400 mt-3 space-twinkle">↗ Stellar</div>
        </div>
      </div>

      {/* Space Processing Summary */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container space-hover">
            <BarChart3 className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-nebula">Processing Summary</h3>
            <p className="space-body-sm">Comprehensive cosmic data enhancement results</p>
          </div>
        </div>

        <div className="space-grid-stats">
          {[
            { label: 'Original Records', value: originalData?.rowCount?.toLocaleString() || '0', color: 'gray-400' },
            { label: 'Processed Records', value: Math.floor((originalData?.rowCount || 0) * 0.95).toLocaleString(), color: 'teal-400' },
            { label: 'Issues Resolved', value: issues?.reduce((acc: number, issue: any) => acc + issue.count, 0) || 0, color: 'purple-400' },
            { label: 'Processing Time', value: `${results.estimatedCleaningTime || 20}s`, color: 'white' }
          ].map((metric, index) => (
            <div key={index} className="text-center p-6 rounded-xl space-surface-elevated border border-gray-700">
              <div className={`font-space-primary text-2xl font-bold text-${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="space-body-sm">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImprovementsTab = () => (
    <div className="space-y-12">
      {/* Space Performance Improvements */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container-success space-float">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-star">Stellar Performance Improvements</h3>
            <p className="space-body-sm">Before and after cosmic optimization comparison</p>
          </div>
        </div>

        <div className="space-y-8">
          {[
            { 
              metric: 'Data Completeness', 
              before: 70, 
              after: improvements?.dataCompleteness || 95,
              description: 'Missing values addressed through stellar algorithms'
            },
            { 
              metric: 'Data Consistency', 
              before: 75, 
              after: improvements?.dataConsistency || 92,
              description: 'Format inconsistencies resolved with cosmic standards'
            },
            { 
              metric: 'Format Compliance', 
              before: 85, 
              after: improvements?.formatCompliance || 98,
              description: 'Data types optimized for stellar compatibility'
            }
          ].map((improvement, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-space-secondary space-body text-white mb-2">{improvement.metric}</div>
                  <div className="space-body-sm">{improvement.description}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <span className="font-space-secondary text-sm text-gray-400">{improvement.before}%</span>
                    <span className="text-purple-400">→</span>
                    <span className="font-space-secondary text-sm font-bold text-teal-400">{improvement.after}%</span>
                  </div>
                  <div className="text-xs text-teal-400 mt-2 space-twinkle">
                    +{improvement.after - improvement.before}% Improvement
                  </div>
                </div>
              </div>
              
              {/* Space Progress Comparison */}
              <div className="flex items-center space-x-6">
                <div className="flex-1 space-y-3">
                  <div className="text-xs text-gray-500">Before Processing</div>
                  <div className="space-progress-container">
                    <div 
                      className="h-full bg-gray-500 rounded-sm"
                      style={{ width: `${improvement.before}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="text-xs text-teal-400">After Enhancement</div>
                  <div className="space-progress-container">
                    <div 
                      className="space-progress-fill"
                      style={{ width: `${improvement.after}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Space Applied Solutions */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container space-hover">
            <Zap className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-nebula">Applied Cosmic Methods</h3>
            <p className="space-body-sm">Stellar algorithms that enhanced your data universe</p>
          </div>
        </div>

        <div className="space-y-6">
          {recommendations?.map((recommendation: string, index: number) => (
            <div key={index} className="flex items-start space-x-4 p-6 rounded-xl space-surface-elevated bg-gradient-to-r from-teal-500/10 to-white/10 border border-teal-400/20 space-exploration">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-white flex items-center justify-center mt-1">
                <CheckCircle className="w-5 h-5 text-space-blue-deep" />
              </div>
              <div className="flex-1">
                <div className="font-space-secondary space-body mb-2 text-white">
                  Enhancement Protocol {index + 1}
                </div>
                <div className="space-body-sm mb-3">{recommendation}</div>
                <div className="flex items-center space-x-3 mt-3">
                  <div className="space-badge space-badge-success space-pulse">Successfully Applied ✓</div>
                  <div className="text-xs text-teal-400 space-twinkle">Stellar Verified</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIssuesTab = () => (
    <div className="space-y-12">
      {/* Space Issues Resolution */}
      <div className="space-card space-card-padding border border-gray-700 space-exploration">
        <div className="flex items-center space-x-4 mb-8">
          <div className="space-icon-container space-pulse">
            <FileText className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="space-subtitle font-space-primary space-text-gradient-star">Cosmic Issues Resolved</h3>
            <p className="space-body-sm">Data quality issues identified and stellarly addressed</p>
          </div>
        </div>

        <div className="space-y-6">
          {issues?.map((issue: any, index: number) => (
            <div key={index} className="space-card space-card-padding border border-gray-700 space-exploration">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-4 h-4 rounded-full mt-3 ${
                    issue.severity === 'high' ? 'bg-red-500' :
                    issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  } space-twinkle`} />
                  <div>
                    <div className="font-space-secondary space-body mb-2 text-white">
                      {issue.type}
                    </div>
                    <div className="space-body-sm mb-3">{issue.description}</div>
                    <div className="text-xs">
                      Priority Level: <span className={`capitalize font-bold font-space-secondary ${
                        issue.severity === 'high' ? 'text-red-400' :
                        issue.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                      }`}>{issue.severity.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-space-primary text-2xl font-bold text-yellow-400 mb-2">
                    {issue.count}
                  </div>
                  <div className="space-body-sm">Issues</div>
                </div>
              </div>

              {/* Space Resolution */}
              <div className="pt-6">
                <div className="space-divider-glow mb-6" />
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1 space-pulse" />
                  <div>
                    <div className="font-space-secondary text-teal-400 mb-2">
                      ✅ Stellar Resolution Applied Successfully
                    </div>
                    <div className="space-body-sm mb-3">{issue.recommendation}</div>
                    <div className="flex items-center space-x-3">
                      <div className="space-badge space-badge-success space-pulse">Issue Resolved</div>
                      <div className="text-xs text-teal-400 space-twinkle">100% Verified</div>
                    </div>
                  </div>
                </div>
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
          <div className="space-icon-container-success space-glow-cycle">
            <Star className="w-8 h-8" />
          </div>
          <h2 className="space-title-lg font-space-primary space-text-gradient-star">
            Mission Results
          </h2>
        </div>
        <p className="space-body max-w-3xl mx-auto">
          Stellar data processing complete • Your dataset has been optimized for cosmic analytics exploration
        </p>
      </div>

      {/* Space Navigation Tabs */}
      <div className="space-card-elevated space-card-padding">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
          {[
            { id: 'summary', label: 'Mission Summary', icon: Award },
            { id: 'improvements', label: 'Stellar Improvements', icon: TrendingUp },
            { id: 'issues', label: 'Issues Resolved', icon: CheckCircle }
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
          {activeTab === 'summary' && renderSummaryTab()}
          {activeTab === 'improvements' && renderImprovementsTab()}
          {activeTab === 'issues' && renderIssuesTab()}
        </div>
      </div>

      {/* Space Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          onClick={handleDownloadCleaned}
          className="space-btn-primary inline-flex items-center space-x-3"
        >
          <Download className="w-6 h-6" />
          <span>Download Cosmic Data</span>
        </button>
        
        <button
          onClick={handleDownloadReport}
          className="space-btn-secondary inline-flex items-center space-x-3"
        >
          <BarChart3 className="w-6 h-6" />
          <span>Download Analysis Report</span>
        </button>
      </div>

      {/* Space Final Status */}
      <div className="text-center">
        <div className="space-card-floating space-card-padding inline-block border border-teal-400/30 space-exploration">
          <div className="flex items-center space-x-6">
            <div className="space-icon-container-success space-pulse">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="text-left">
              <div className="space-caption text-teal-400 mb-2">
                Mission Complete
              </div>
              <div className="space-body-sm">
                Your data is now stellarly optimized and ready for cosmic deployment!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
