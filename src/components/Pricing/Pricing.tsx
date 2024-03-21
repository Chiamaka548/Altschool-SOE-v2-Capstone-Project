import './Pricing.css'

const Pricing = () => {
  return (
    <>
      <div className="pricing-container">
        <div className="pricing-info">
          <h1 className="pricing-header">
          A <span className="highlighted">price perfect </span>for your needs.
          </h1>
          <p className="pricing-description">
          From catering for your personal, business, event, socials needs, you can be rest assured we have you in mind in our pricing.
          </p>
        </div>
        <div className="pricing-cards">
          <div className="white-card">
            <p className="category">Basic</p>
            <p className="price">Free</p>
            <p className="text">Free plan for all users</p>
            <ul>
              <li>Unlimited URL Shortening</li>
              <li>Basic Link Analytics</li>
              <li>Customizable Short Links</li>
              <li>Standard Support</li>
              <li>Ad-supported</li>
            </ul>
          </div>
          <div className="blue-card">
              <p className="category">Professional</p>
              <p className="price">$15/month</p>
              <p className="text">Ideal for business creators</p>
            <ul>
              <li>Enhanced Link Analytics</li>
              <li>Custom Branded Domains</li>
              <li>Advanced Link Customization</li>
              <li>Priority Support</li>
              <li>Ad-free Experience</li>
            </ul>
          </div>
          <div className="white-card">
              <p className="category">Teams</p>
              <p className="price">$25/month</p>
              <p className="text">Share with up to 10 users</p>
            <ul>
              <li>Team Collaboration</li>
              <li>User Roles and Permissions</li>
              <li>Enhanced Security</li>
              <li>API Access</li>
              <li>Dedicated Account Manager</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="price-buttons">
        <button className="inverse-button">Get Custom Pricing</button>
        <button className="primary-button">Select Pricing</button>
      </div>
    </>
  )
}

export default Pricing;
