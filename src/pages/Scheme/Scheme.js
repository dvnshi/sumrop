import React from 'react';
import './Scheme.css'; // Import the CSS file for styling
import a from '../../assets/a.jpg';
import b from '../../assets/scheme2.jpg';
import c from '../../assets/scheme3.jpg';
import d from '../../assets/scheme4.jpg';
import e from '../../assets/scheme5.jpg';
import f from '../../assets/scheme6.jpg';

const Scheme = () => {
  return (
    <div>
      
      <div className="card-list">
        <a href="#" className="card-item">
          <img src={a} alt="Card Image" />
          <span className="developer">Medical</span>
          <h3>MGM Bone Marrow Transplant Unit Treats Over 100 Patients</h3>
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div>
        </a>
        <a href="#" className="card-item">
          <img src={b} alt="Card Image" />
          <span className="designer">Innovation</span>
          <h3>Hack'Ndore Hackathon From July 26</h3>
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div>
        </a>
        <a href="#" className="card-item">
          <img src={c} alt="Card Image" />
          <span className="editor">Locality</span>
          <h3>Over 100 Houses Demolished in Justice Nagar Extension Area</h3>
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div>
        </a>
        <a href="#" className="card-item">
          <img src={d} alt="Card Image" />
          <span className="developer">Medical</span>
          <h3>DAVV Lokpal to Address Report Against Colleges</h3>
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div>
        </a>
        <a href="#" className="card-item">
          <img src={e} alt="Card Image" />
          <span className="developer">Medical</span>
          <h3>25-Year-Old Dies By Suicide in Indore</h3>
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div>
        </a>
        <a href="#" className="card-item">
          <img src={f} alt="Card Image" />
          <span className="developer">Educational</span>
          <h3>100% Seats Allotted in Most BEd Colleges in Indore</h3>
          <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div>
        </a>
      </div>
      
    </div>
  );
};

export default Scheme;