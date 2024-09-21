import React, { useState, useEffect } from 'react';
import './QueryBoard.css';

const QueryBoard = () => {
    const [issuesData, setIssuesData] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            const data = [
                { id: 1, name: 'Street Light Not Working', upvotes: 10, genuine_count: 2 },
                { id: 2, name: 'Pothole on Main Street', upvotes: 5, genuine_count: 1 },
                { id: 3, name: 'Garbage Collection Delay', upvotes: 7, genuine_count: 3 },
                { id: 4, name: 'Broken Sidewalk', upvotes: 8, genuine_count: 0 },
                { id: 5, name: 'Water Supply Issue', upvotes: 3, genuine_count: 4 },
                { id: 6, name: 'Street Dogs', upvotes: 10, genuine_count: 2 },
                { id: 7, name: 'Pothole on Bridges', upvotes: 5, genuine_count: 1 },
            ];
            setIssuesData(data);
            setFilteredIssues(data);
        };

        fetchIssues();
    }, []);

    const updateIssueCounts = (issueId, field) => {
        setIssuesData((prevIssues) => {
            const updatedIssues = prevIssues.map(issue => {
                if (issue.id === issueId) {
                    return {
                        ...issue,
                        [field]: issue[field] + 1
                    };
                }
                return issue;
            }).sort((a, b) => b.upvotes - a.upvotes);
            setFilteredIssues(updatedIssues);
            return updatedIssues;
        });
    };

    const handleUpvote = (issueId) => {
        updateIssueCounts(issueId, 'upvotes');
    };

    const handleMarkGenuine = (issueId) => {
        updateIssueCounts(issueId, 'genuine_count');
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filtered = issuesData.filter(issue =>
            issue.name.toLowerCase().includes(searchValue)
        );
        setFilteredIssues(filtered);
    };

    return (
        <div className="query-board">
           
            <main>
                <section className="issue-list">
                    <h2>Citizen Issues</h2>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search issues..."
                        onChange={handleSearch}
                    />
                    <ul id="issues">
                        {filteredIssues.map(issue => (
                            <li key={issue.id}>
                                <div className="issue-details">
                                    <span>{issue.name}</span>
                                    <div className="issue-stats">
                                        <span><strong>{issue.upvotes}</strong> Upvotes</span>
                                        <span><strong>{issue.genuine_count}</strong> Genuine</span>
                                    </div>
                                </div>
                                <div className="issue-actions">
                                    <button onClick={() => handleUpvote(issue.id)}>Upvote</button>
                                    <button className="genuine-button" onClick={() => handleMarkGenuine(issue.id)}>Mark as Genuine</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            
        </div>
    );
};

export default QueryBoard;