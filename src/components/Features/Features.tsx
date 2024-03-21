import './Features.css'

const Features = () => {
    return (
        <>
            <div className='features-container'>
                <div className='features-info'>
                    <h1 className='features-header'>
                        Why Choose
                        <span className='highlighted'> Scissor</span>
                    </h1>
                    <p className="features-description">
                    Scissor is the hub of everything that has to do with your link management. We shorten your URLs, allow you creating custom ones for your personal, business, event usage. Our swift QR code creation, management and usage tracking with advance analytics for all of these is second to none. 
                    </p>
                </div>
                <div className='feature-list'>
                    <div className='feature top'>
                        <img src='/static/images/link.svg'/>
                        <div className="feature-text">
                            <h3 className='feature-header'>URL Shortening</h3>
                            <p className='feature-description'>
                            Scissor allows you to shorten URLs of your business, events. Shorten your URL at scale, URL redirects.
                            </p>
                        </div>
                    </div>
                    <div className='feature top'>
                        <img src='/static/images/customurls.svg' />
                        <div className="feature-text">
                            <h3 className='feature-header'>Custom URLs</h3>
                            <p className='feature-description'>
                            With Scissor, you can create custom URLs, with the length you want! A solution for socials and businesses.
                            </p>
                        </div>
                    </div>
                    <div className='feature'>
                        <img src='/static/images/QRcodes.svg' />
                        <div className="feature-text">
                            <h3 className='feature-header'>QR Codes</h3>
                            <p className='feature-description'>
                            Generate QR codes to your business, events. Bring your audience and customers to your doorstep with this scan and go solution.
                            </p>
                        </div>
                    </div>
                    <div className='feature'>
                        <img src='/static/images/data-analytics.svg' />
                        <div className="feature-text">
                            <h3 className='feature-header'>Data Analytics</h3>
                            <p className='feature-description'>
                            Receive data on the usage of either your shortened URL, custom URLs or generated QR codes. Embedded to monitor progress.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

 export default Features;     