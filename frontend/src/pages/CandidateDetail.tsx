import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Linkedin, Clock, Building, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { candidates } from '../data/mockData';

const CandidateDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Find candidate from mock data
  const candidate = candidates.find(c => c.id === id);

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <p className="text-gray-500">Candidate not found</p>
      </div>
    );
  }

  const mockExtractedData = {
    name: candidate.name,
    position: candidate.position,
    experience: '5+ years',
    education: 'Bachelor\'s in Computer Science',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    languages: ['English (Fluent)', 'Spanish (Intermediate)'],
    linkedin: 'https://linkedin.com/in/example',
    email: 'candidate@example.com',
    phone: '+1 (555) 123-4567'
  };

  const handleRefreshAI = () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-500 mt-1">{candidate.position}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon={<Download size={16} />}
          >
            Download CV
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleRefreshAI}
          >
            Refresh AI Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CV Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Professional Summary</h3>
                    <p className="text-gray-500 mt-1">
                      Experienced {candidate.position} with a strong background in web development
                      and a focus on creating scalable applications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Experience</h3>
                    <p className="text-gray-500 mt-1">{mockExtractedData.experience}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Education</h3>
                    <p className="text-gray-500 mt-1">{mockExtractedData.education}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockExtractedData.skills.map((skill, index) => (
                      <Badge key={index} variant="primary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockExtractedData.languages.map((language, index) => (
                      <Badge key={index} variant="secondary">{language}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900 mt-1">{mockExtractedData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900 mt-1">{mockExtractedData.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">LinkedIn</label>
                  <a
                    href={mockExtractedData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-1"
                  >
                    <Linkedin size={16} />
                    <span>View Profile</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {candidate.notes || 'No notes added yet.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;