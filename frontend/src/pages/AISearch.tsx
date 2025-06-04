import React, { useState } from 'react';
import { Search, Users, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { candidates } from '../data/mockData';

const AISearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const toggleCandidateSelection = (id: string) => {
    setSelectedCandidates(prev =>
      prev.includes(id)
        ? prev.filter(cid => cid !== id)
        : [...prev, id]
    );
  };

  const handleBulkSearch = () => {
    setIsSearching(true);
    // Simulate bulk AI search
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Search</h1>
        <p className="text-gray-500 mt-1">Search and analyze candidates using AI</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              placeholder="Enter search criteria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              className="flex-1"
            />
            <Button type="submit" isLoading={isSearching}>
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Candidates</CardTitle>
          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            disabled={selectedCandidates.length === 0 || isSearching}
            isLoading={isSearching}
            onClick={handleBulkSearch}
          >
            Bulk AI Search ({selectedCandidates.length})
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedCandidates.length === candidates.length}
                    onChange={(e) => {
                      setSelectedCandidates(
                        e.target.checked
                          ? candidates.map(c => c.id)
                          : []
                      );
                    }}
                  />
                </TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Position</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>AI Status</TableHeader>
                <TableHeader className="text-right">Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map(candidate => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => toggleCandidateSelection(candidate.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {candidate.name}
                  </TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.category}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Analyzed
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Users size={16} />}
                    >
                      View Results
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISearch;