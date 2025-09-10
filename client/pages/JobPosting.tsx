import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function JobPosting() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [locationType, setLocationType] = useState("onsite");
  const [locationText, setLocationText] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [benefits, setBenefits] = useState("");
  const [applicationInstructions, setApplicationInstructions] = useState("");
  const [datePosted, setDatePosted] = useState<string>(new Date().toISOString().slice(0, 10));
  const [jobId, setJobId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      company,
      locationType,
      locationText,
      jobType,
      salary,
      description,
      qualifications,
      benefits,
      applicationInstructions,
      datePosted,
      jobId,
    };

    console.log("Job posting saved:", payload);
    alert("Job posting saved (console).");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Job Posting</h1>

      <Card>
        <CardHeader>
          <CardTitle>New Job Posting</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Basic Info */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Job Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Software Engineer" />
                </div>

                <div>
                  <Label className="text-sm">Company Name</Label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
                </div>

                <div>
                  <Label className="text-sm">Location Type</Label>
                  <Select value={locationType} onValueChange={setLocationType}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">Onsite</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Location (City / Country)</Label>
                  <Input value={locationText} onChange={(e) => setLocationText(e.target.value)} placeholder="e.g., San Francisco, CA" />
                </div>

                <div>
                  <Label className="text-sm">Job Type</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Salary Range / Compensation</Label>
                  <Input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g., $80,000 - $110,000" />
                </div>

                <div>
                  <Label className="text-sm">Date Posted</Label>
                  <Input type="date" value={datePosted} onChange={(e) => setDatePosted(e.target.value)} />
                </div>

                <div>
                  <Label className="text-sm">Job ID / Reference Code (optional)</Label>
                  <Input value={jobId} onChange={(e) => setJobId(e.target.value)} placeholder="Optional" />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Job Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Responsibilities, role overview" className="min-h-[120px]" />
                </div>

                <div>
                  <Label className="text-sm">Qualifications</Label>
                  <Textarea value={qualifications} onChange={(e) => setQualifications(e.target.value)} placeholder="Skills, education, experience" className="min-h-[120px]" />
                </div>

                <div>
                  <Label className="text-sm">Benefits</Label>
                  <Textarea value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder="Healthcare, PTO, retirement, etc." className="min-h-[80px]" />
                </div>

                <div>
                  <Label className="text-sm">Application Instructions</Label>
                  <Textarea value={applicationInstructions} onChange={(e) => setApplicationInstructions(e.target.value)} placeholder="Apply link, contact email, deadline" className="min-h-[80px]" />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-end w-full gap-2">
              <Button variant="outline" type="button" onClick={() => {
                setTitle("");
                setCompany("");
                setLocationType("onsite");
                setLocationText("");
                setJobType("full-time");
                setSalary("");
                setDescription("");
                setQualifications("");
                setBenefits("");
                setApplicationInstructions("");
                setDatePosted(new Date().toISOString().slice(0,10));
                setJobId("");
              }}>Reset</Button>
              <Button type="submit">Save Job Posting</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
