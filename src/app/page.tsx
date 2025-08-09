'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Database, Cpu, Zap, CheckCircle, Heart, BarChart3 } from 'lucide-react';
import { DataUpload } from '@/components/data-upload';
import { DataPreview } from '@/components/data-preview';
import { AIAnalysis } from '@/components/ai-analysis';
import { CleaningResults } from '@/components/cleaning-results';

import { sdk } from '@farcaster/miniapp-sdk'
interface StepConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'active' | 'pending';
}

export default function DataCleanAI(): JSX.Element {
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            if (document.readyState === 'complete') {
              resolve(void 0)
            } else {
              window.addEventListener('load', () => resolve(void 0), { once: true })
            }
          })
        }
        
        await sdk.actions.ready()
        console.log('Farcaster SDK initialized successfully - app fully loaded')
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error)
        setTimeout(async () => {
          try {
            await sdk.actions.ready()
            console.log('Farcaster SDK initialized on retry')
          } catch (retryError) {
            console.error('Farcaster SDK retry failed:', retryError)
          }
        }, 1000)
      }
    }

    initializeFarcaster()
  }, [])
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const steps: StepConfig[] = [
    {
      id: 'upload',
      title: 'Data Upload',
      description: 'Launch your data journey',
      icon: Database,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending'
    },
    {
      id: 'preview',
      title: 'Data Preview',
      description: 'Explore your data universe',
      icon: Zap,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending'
    },
    {
      id: 'analysis',
      title: 'Cosmic Analysis',
      description: 'Deep space data scanning',
      icon: Cpu,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending'
    },
    {
      id: 'results',
      title: 'Mission Results',
      description: 'Discover refined insights',
      icon: CheckCircle,
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'pending'
    }
  ];

  const handleDataUploaded = (data: any): void => {
    setUploadedData(data);
    setCurrentStep(2);
  };

  const handlePreviewConfirmed = (): void => {
    setCurrentStep(3);
  };

  const handleAnalysisComplete = (results: any): void => {
    setAnalysisResults(results);
    setCurrentStep(4);
  };

  const renderStepIndicator = (step: StepConfig, index: number): JSX.Element => {
    const Icon = step.icon;
    const isActive = step.status === 'active';
    const isCompleted = step.status === 'completed';
    const isPending = step.status === 'pending';

    return (
      <div key={step.id} className="flex items-center">
        {/* Step Circle */}
        <div
          className={`
            relative flex items-center justify-center w-24 h-24 rounded-3xl space-smooth-transition
            ${isActive 
              ? 'space-icon-container-primary space-glow-cycle' 
              : isCompleted 
                ? 'space-icon-container-success space-pulse' 
                : 'space-icon-container space-hover'
            }
          `}
        >
          <Icon 
            className={`
              w-9 h-9 space-smooth-transition
              ${isActive 
                ? 'text-white' 
                : isCompleted 
                  ? 'text-white' 
                  : 'text-purple-300'
              }
            `} 
          />
          
          {/* Space effect for active step */}
          {isActive && (
            <div className="absolute inset-0 rounded-3xl border-2 border-white space-pulse opacity-25" />
          )}
        </div>

        {/* Step Info */}
        <div className="ml-8 min-w-0">
          <div 
            className={`
              space-title font-space-primary space-smooth-transition
              ${isActive 
                ? 'space-text-gradient-nebula' 
                : isCompleted 
                  ? 'space-text-gradient-star' 
                  : 'text-gray-400'
              }
            `}
          >
            {step.title}
          </div>
          <div className="space-body-sm">
            {step.description}
          </div>
        </div>

        {/* Connector Line */}
        {index < steps.length - 1 && (
          <div className="flex-1 mx-8 relative">
            <div className={`h-1 rounded-full space-smooth-transition ${
              isCompleted 
                ? 'bg-gradient-to-r from-purple-400 via-white to-blue-400' 
                : 'bg-gray-700'
            }`} />
            {isCompleted && (
              <div className="absolute inset-0 h-1 rounded-full bg-gradient-to-r from-purple-400 via-white to-blue-400 space-shimmer opacity-60" />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderCurrentStepContent = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return <DataUpload onDataUploaded={handleDataUploaded} />;
      case 2:
        return <DataPreview data={uploadedData} onPreviewConfirmed={handlePreviewConfirmed} />;
      case 3:
        return <AIAnalysis data={uploadedData} onAnalysisComplete={handleAnalysisComplete} />;
      case 4:
        return <CleaningResults results={analysisResults} originalData={uploadedData} />;
      default:
        return <DataUpload onDataUploaded={handleDataUploaded} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-blue-deep via-space-blue-dark to-space-blue-medium space-bg-pattern">
      {/* Space Starfield Background */}
      <div className="space-starfield">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full space-twinkle" />
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-300 rounded-full space-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-48 left-1/3 w-1 h-1 bg-blue-200 rounded-full space-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/4 w-1 h-1 bg-white rounded-full space-twinkle" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-20 left-1/5 w-1 h-1 bg-purple-200 rounded-full space-twinkle" style={{ animationDelay: '4s' }} />
      </div>

      {/* Space Floating Background Elements */}
      <div className="space-floating-elements">
        <div className="absolute top-20 left-10 w-36 h-36 border border-purple-500 rounded-full opacity-10 space-float" />
        <div className="absolute top-40 right-20 w-28 h-28 border border-white rounded-lg opacity-12 space-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-32 left-20 w-44 h-44 border border-blue-300 rounded-full opacity-8 space-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-white rounded-lg opacity-10 space-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <header className="space-section-padding bg-gradient-to-br from-space-blue-deep/95 to-space-blue-surface/90 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-6xl mx-auto text-center relative">
            {/* Title */}
            <h1 className="space-display mb-8 font-space-primary">
              DataExplorer
              <span className="space-text-gradient-star"> • Space</span>
            </h1>
            
            {/* Subtitle */}
            <p className="space-body mb-12 max-w-3xl mx-auto">
              Journey through the cosmos of your data and discover hidden insights across the infinite expanse of information
            </p>

            {/* Space Feature Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <span className="space-badge space-badge-primary space-pulse">Deep Space Analysis</span>
              <span className="space-badge space-badge-accent space-float">Cosmic Data Discovery</span>
              <span className="space-badge space-badge-info space-glow-cycle">Stellar Insights</span>
              <span className="space-badge space-badge-success">Mission Ready</span>
            </div>
          </div>
        </header>

        {/* Progress Steps */}
        <section className="space-content-padding">
          <div className="max-w-7xl mx-auto">
            <div className="space-card-floating space-card-padding mb-8">
              {/* Steps Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="space-icon-container-primary space-glow-cycle">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h2 className="space-title-lg font-space-primary space-text-gradient-nebula">
                    Mission Control
                  </h2>
                </div>
                <p className="space-body-sm max-w-2xl mx-auto">Navigate through this exploration sequence to transform your data into cosmic insights</p>
              </div>

              {/* Step Indicators */}
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-8 xl:space-y-0 mb-12">
                {steps.map((step, index) => renderStepIndicator(step, index))}
              </div>

              {/* Current Step Info */}
              <div className="pt-8">
                <div className="space-divider-glow mb-8" />
                <div className="text-center">
                  <div className="space-surface-elevated inline-block px-6 py-3 rounded-xl mb-4 border border-purple-400/30">
                    <span className="space-caption text-purple-300">
                      MISSION PHASE {currentStep} OF {steps.length}
                    </span>
                  </div>
                  <p className="space-body-sm max-w-2xl mx-auto">
                    {currentStep === 1 && "Begin your cosmic journey by uploading CSV or JSON datasets for deep space analysis"}
                    {currentStep === 2 && "Survey your data constellation and prepare for comprehensive stellar analysis"}
                    {currentStep === 3 && "Advanced cosmic algorithms are exploring your data universe for hidden patterns and anomalies"}
                    {currentStep === 4 && "Your mission is complete! Download your refined data, now optimized for stellar performance"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Step Content */}
        <main className="space-section-padding">
          <div className="max-w-7xl mx-auto">
            {renderCurrentStepContent()}
          </div>
        </main>

        {/* Space Footer */}
        <footer className="space-content-padding bg-gradient-to-t from-space-blue-deep to-space-blue-surface/50 border-t border-purple-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="space-icon-container space-pulse">
                <Heart className="w-6 h-6 text-purple-300" />
              </div>
              <p className="space-body-sm">
                Crafted for cosmic data exploration • Trusted by space explorers
              </p>
            </div>
            <div className="flex justify-center items-center space-x-6">
              <div className="space-surface-elevated px-4 py-2 rounded-lg border border-purple-400/20">
                <span className="space-caption text-purple-300">DATAEXPLORER v3.0</span>
              </div>
              <div className="space-surface-elevated px-4 py-2 rounded-lg border border-white/20">
                <span className="space-caption text-white">SPACE EDITION</span>
              </div>
              <div className="space-surface-elevated px-4 py-2 rounded-lg border border-blue-300/20">
                <span className="space-caption text-blue-200">MISSION READY</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
