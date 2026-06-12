import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './SearchingPorterPage.css';

const SearchingPorterPage = () => {
    const navigate = useNavigate();
    const [statusIndex, setStatusIndex] = useState(0);

    const statuses = [
        "Checking porter availability at Platform 4...",
        "Matching with top-rated porters nearby...",
        "Ramesh Kumar is available and accepting...",
        "Finalizing details and route..."
    ];

    useEffect(() => {
        const statusTimer = setInterval(() => {
            setStatusIndex(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
        }, 1500);

        const redirectTimer = setTimeout(() => {
            navigate('/assigned');
        }, 6000);

        return () => {
            clearInterval(statusTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <DashboardLayout>
            <div className="searching-page fade-in">
                <div className="searching-container-premium">
                    <div className="radar-orbit">
                        <div className="radar-scanner"></div>
                        <div className="radar-circles">
                            <div className="c1"></div>
                            <div className="c2"></div>
                            <div className="c3"></div>
                        </div>
                        <div className="center-icon">🚂</div>
                        <div className="dot d1"></div>
                        <div className="dot d2"></div>
                        <div className="dot d3"></div>
                    </div>

                    <div className="searching-text-premium">
                        <h1 className="text-gradient">Finding Your Porter</h1>
                        <p className="text-muted">Stay tight! We're connecting you with a verified assistant.</p>
                    </div>

                    <Card className="status-timeline-card">
                        <div className="status-timeline">
                            {statuses.map((s, i) => (
                                <div key={i} className={`status-line-item ${i < statusIndex ? 'completed' : i === statusIndex ? 'active' : ''}`}>
                                    <div className="status-node">
                                        {i < statusIndex ? '✓' : ''}
                                    </div>
                                    <span className="status-msg">{s}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="searching-actions">
                        <Button variant="secondary" className="btn-full" onClick={() => navigate('/book')}>
                            Cancel Request
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SearchingPorterPage;
