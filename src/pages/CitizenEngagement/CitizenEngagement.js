import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CitizenEngagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('report');
  const [reports, setReports] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [news, setNews] = useState([]);
  const [reportForm, setReportForm] = useState({ type: '', description: '', location: '' });
  const [ideaForm, setIdeaForm] = useState({ title: '', description: '' });
  const [userProfile, setUserProfile] = useState({ name: 'John Doe', points: 100 });

  useEffect(() => {
    fetchReports();
    fetchIdeas();
    fetchCurrentPoll();
    fetchNews();
  }, []);

  const fetchReports = () => {
    const sampleReports = [
      { id: 1, type: 'Pothole', status: 'In Progress', votes: 15 },
      { id: 2, type: 'Streetlight Out', status: 'Reported', votes: 8 },
      { id: 3, type: 'Garbage Collection', status: 'Resolved', votes: 23 },
    ];
    setReports(sampleReports);
  };

  const fetchIdeas = () => {
    const sampleIdeas = [
      { id: 1, title: 'Community Garden', votes: 45 },
      { id: 2, title: 'Bike Sharing Program', votes: 62 },
      { id: 3, title: 'Free Wi-Fi in Parks', votes: 38 },
    ];
    setIdeas(sampleIdeas);
  };

  const fetchCurrentPoll = () => {
    setCurrentPoll({
      question: 'What should be the priority for the next city project?',
      options: [
        { id: 1, text: 'New Park', votes: 120 },
        { id: 2, text: 'Road Improvements', votes: 85 },
        { id: 3, text: 'Community Center', votes: 65 },
      ],
    });
  };

  const fetchNews = () => {
    const sampleNews = [
      { id: 1, title: 'New Recycling Program Launched', date: '2024-09-15' },
      { id: 2, title: 'City Council Meeting Highlights', date: '2024-09-10' },
      { id: 3, title: 'Upcoming Street Fair Announcement', date: '2024-09-05' },
    ];
    setNews(sampleNews);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const newReport = { ...reportForm, id: reports.length + 1, status: 'Reported', votes: 0 };
    setReports([...reports, newReport]);
    setReportForm({ type: '', description: '', location: '' });
    setUserProfile({ ...userProfile, points: userProfile.points + 10 });
    alert('Report submitted successfully! You earned 10 points.');
  };

  const handleIdeaSubmit = (e) => {
    e.preventDefault();
    const newIdea = { ...ideaForm, id: ideas.length + 1, votes: 0 };
    setIdeas([...ideas, newIdea]);
    setIdeaForm({ title: '', description: '' });
    setUserProfile({ ...userProfile, points: userProfile.points + 20 });
    alert('Idea submitted successfully! You earned 20 points.');
  };

  const handleVote = (itemType, id) => {
    if (itemType === 'report') {
      setReports(reports.map(report =>
        report.id === id ? { ...report, votes: report.votes + 1 } : report
      ));
    } else if (itemType === 'idea') {
      setIdeas(ideas.map(idea =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      ));
    } else if (itemType === 'poll') {
      setCurrentPoll({
        ...currentPoll,
        options: currentPoll.options.map(option =>
          option.id === id ? { ...option, votes: option.votes + 1 } : option
        ),
      });
    }
    setUserProfile({ ...userProfile, points: userProfile.points + 5 });
    alert('Vote recorded! You earned 5 points.');
  };

  const renderReportIssue = () => (
    <div style={styles.formContainer}>
      <h3 style={styles.subheader}>Report an Issue</h3>
      <form onSubmit={handleReportSubmit}>
        <select
          value={reportForm.type}
          onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
          style={styles.input}
          required
        >
          <option value="">Select Issue Type</option>
          <option value="Pothole">Pothole</option>
          <option value="Streetlight Out">Streetlight Out</option>
          <option value="Garbage Collection">Garbage Collection</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          value={reportForm.location}
          onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
          placeholder="Location"
          style={styles.input}
          required
        />
        <textarea
          value={reportForm.description}
          onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
          placeholder="Description"
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>Submit Report</button>
      </form>
    </div>
  );

  const renderSubmitIdea = () => (
    <div style={styles.formContainer}>
      <h3 style={styles.subheader}>Submit an Idea</h3>
      <form onSubmit={handleIdeaSubmit}>
        <input
          type="text"
          value={ideaForm.title}
          onChange={(e) => setIdeaForm({ ...ideaForm, title: e.target.value })}
          placeholder="Idea Title"
          style={styles.input}
          required
        />
        <textarea
          value={ideaForm.description}
          onChange={(e) => setIdeaForm({ ...ideaForm, description: e.target.value })}
          placeholder="Idea Description"
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>Submit Idea</button>
      </form>
    </div>
  );

  const renderPoll = () => (
    <div style={styles.pollContainer}>
      <h3 style={styles.subheader}>{currentPoll.question}</h3>
      {currentPoll.options.map((option) => (
        <div key={option.id} style={styles.pollOption}>
          <span>{option.text}</span>
          <button onClick={() => handleVote('poll', option.id)} style={styles.voteButton}>Vote</button>
        </div>
      ))}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={currentPoll.options}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="votes"
          >
            {currentPoll.options.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const renderCityNews = () => (
    <div style={styles.newsContainer}>
      <h3 style={styles.subheader}>City News and Announcements</h3>
      {news.map((item) => (
        <div key={item.id} style={styles.newsItem}>
          <h4>{item.title}</h4>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  );

  const renderReportsAndIdeas = () => (
    <div style={styles.listsContainer}>
      <div style={styles.listWrapper}>
        <h3 style={styles.subheader}>Recent Reports</h3>
        {reports.map((report) => (
          <div key={report.id} style={styles.listItem}>
            <span>{report.type} - {report.status}</span>
            <button onClick={() => handleVote('report', report.id)} style={styles.voteButton}>
              👍 {report.votes}
            </button>
          </div>
        ))}
      </div>
      <div style={styles.listWrapper}>
        <h3 style={styles.subheader}>Popular Ideas</h3>
        {ideas.map((idea) => (
          <div key={idea.id} style={styles.listItem}>
            <span>{idea.title}</span>
            <button onClick={() => handleVote('idea', idea.id)} style={styles.voteButton}>
              👍 {idea.votes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUserProfile = () => (
    <div style={styles.profileContainer}>
      <h3 style={styles.subheader}>User Profile</h3>
      <p>Name: {userProfile.name}</p>
      <p>Engagement Points: {userProfile.points}</p>
      <div style={styles.badgeContainer}>
        <span style={styles.badge}>Active Citizen</span>
        <span style={styles.badge}>Idea Generator</span>
        <span style={styles.badge}>Community Helper</span>
      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.header}>Citizen Engagement Dashboard</h1>
      {renderUserProfile()}
      <div style={styles.tabContainer}>
        <button onClick={() => setActiveTab('report')} style={activeTab === 'report' ? styles.activeTab : styles.tab}>Report Issue</button>
        <button onClick={() => setActiveTab('idea')} style={activeTab === 'idea' ? styles.activeTab : styles.tab}>Submit Idea</button>
        <button onClick={() => setActiveTab('poll')} style={activeTab === 'poll' ? styles.activeTab : styles.tab}>Current Poll</button>
        <button onClick={() => setActiveTab('news')} style={activeTab === 'news' ? styles.activeTab : styles.tab}>City News</button>
      </div>
      {activeTab === 'report' && renderReportIssue()}
      {activeTab === 'idea' && renderSubmitIdea()}
      {activeTab === 'poll' && renderPoll()}
      {activeTab === 'news' && renderCityNews()}
      {renderReportsAndIdeas()}
    </div>
  );
};

const styles = {
  dashboard: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  subheader: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#444',
  },
  tabContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: '#ddd',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
  },
  activeTab: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pollContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  pollOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  voteButton: {
    padding: '5px 10px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  newsContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  newsItem: {
    marginBottom: '15px',
  },
  listsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  listWrapper: {
    width: '48%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  badgeContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  badge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
  },
};

export default CitizenEngagementDashboard;
