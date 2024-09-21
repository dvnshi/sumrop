import React, { useState } from 'react';
import axios from 'axios';
import './Report.css';
import { createClient } from '@supabase/supabase-js';

const ReportIssue = () => {
    const supabaseUrl = 'https://usmakmxitgqbznzpyzhi.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzbWFrbXhpdGdxYnpuenB5emhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNzY1MjYsImV4cCI6MjAzNzY1MjUyNn0.jItGvlOI-2jYXqYpKDsbjWUDhlvXIB2sPIMODA4rLsY';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let fileUrl = '';

        if (file) {
            const fileExt = file.name.split('.').pop();
            const filePath = `reports/${Date.now()}.${fileExt}`;

            const { data: fileData, error: fileError } = await supabase
                .storage
                .from('issues_images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (fileError) {
                console.error('File Upload Error:', fileError);
                alert('There was an error uploading the file.');
                return;
            }

            const { data: publicUrlData } = supabase
                .storage
                .from('issues_images')
                .getPublicUrl(filePath);

            fileUrl = publicUrlData.publicUrl;
        }

        const data = {
            department,
            description,
            location,
            email,
            photo: fileUrl || null,
        };

        const { data: insertData, error } = await supabase
            .from('form_table')
            .insert([data]);

        if (error) {
            console.error('Error:', error);
            alert('There was an error reporting the issue.');
        } else {
            alert('Issue reported successfully!');
            
            // Send email notification
            const emailData = {
                email,
                subject: 'Issue Reported Successfully',
                message: `Your issue has been reported successfully with the following details:\n\nDepartment: ${department}\nDescription: ${description}\nLocation: ${location}\n\nThank you for reporting!`
            };

            try {
                const emailResponse = await axios.post(
                    'https://hackndore.onrender.com/email/send-email/',
                    emailData,
                    {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(emailResponse.data);
            } catch (emailError) {
                console.error('Email Sending Error:', emailError);
                alert('There was an error sending the confirmation email.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Report an Issue</h2>
            <form id="reportForm" onSubmit={handleSubmit}>
                <label htmlFor="department">Department:</label>
                <select
                    id="department"
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                >
                    <option value="TRANSPORTATION">TRANSPORTATION</option>
                    <option value="ARCHITECTURE DEPARTMENT">ARCHITECTURE DEPARTMENT</option>
                    <option value="ADVERTISEMENT">ADVERTISEMENT</option>
                    <option value="BUILDING DEPARTMENT">BUILDING DEPARTMENT</option>
                    <option value="PUBLIC WORKS">PUBLIC WORKS</option>
                    <option value="PARKS AND RECREATION">PARKS AND RECREATION</option>
                    <option value="BUILDINGS AND FACILITIES">BUILDINGS AND FACILITIES</option>
                    <option value="WATER AND SEWER MANAGEMENT">WATER AND SEWER MANAGEMENT</option>
                    <option value="FLEET MANAGEMENT">FLEET MANAGEMENT</option>
                </select>

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Describe the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <label htmlFor="file-upload">Upload Photo/Video:</label>
                <input
                    type="file"
                    id="file-upload"
                    name="file-upload"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />

                <label htmlFor="email">Your Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Submit Report</button>
            </form>
        </div>
    );
};

export default ReportIssue;
