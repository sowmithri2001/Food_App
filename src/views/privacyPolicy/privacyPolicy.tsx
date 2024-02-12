import React from 'react'
import DownloadAppSubHeader from '../../components/downloadAppSubHeader/downloadAppSubHeader';
import "./privacyPolicy.css"
const PrivacyPloicy = () => {
    return (
        <>
            <div className="privacyPolicyContainer">
                <DownloadAppSubHeader />
                <div className="privacyPolicyContent">
                    <span className='ppHeading'>Privacy Policy</span>
                    <span className='introductionTextHead'>Introduction:</span>
                    <span className='introductionText'>This policy explains how we, Xxxxxxxx (hereinafter referred to as “xxxxxx”), use the personal information which you provide to us when using our service, including but not limited to our website and mobile applications (jointly referred as “Website”). Please read this Privacy Policy and understand it before using our services. By visiting and/or ordering services on this Website, you agree and, where required, consent to the collection, use and transfer of your information as set out in this policy.  </span>
                    <span className='introductionTextHead'>What information do we collect about you?</span>
                    <span className='introductionText'>We collect personal information from you when you order goods or services from us or use our Website. We also collect information when you complete any customer survey. Website usage information may also be collected using cookies (as defined below). Xxxxx  will collect information that personally identifies you and/or your location, where required (this may include your name, email address, home address, telephone number, geolocation, etc.), but only when you voluntarily give it to us. We collect this information exclusively to carry out the functions offered on the Website and to provide you with offers and information about xxxxxxx and other services we think you may be interested in. We might collect this personal information through: online food ordering; entry into competitions; subscribing to our newsletter; creating a user account; sending 'contact us' messages or other correspondence through the Website; or through advertising, research and direct marketing. We do not collect sensitive information about you. </span>
                    <span className='introductionTextHead'>Cookies</span>
                    <span className='introductionText'>Some of the information collected will not personally identify you but will instead track your use of the Website so that we can better understand how the Website is used by customers and in turn enhance and improve your experience in ordering food. We may obtain this information by use of cookies. Cookies are a small data file transferred to your device that recognises and identifies your device and allows your device to 'remember' information from the Website for future use. Cookies do not contain any information that personally identifies you and we do not use cookies in order to obtain such information - your personal information can only be obtained by xxxxxxx if you actively provide it to us. We may collect technical information from your mobile device or your use of our services through a mobile device, for example, location data and certain characteristics of, and performance data about your device, carrier/operating system including device and connection type, IP address, mobile payment methods, interaction with other retail technology such as use of NFC Tags, QR Codes or use of mobile vouchers. Your device and/or the web browser should allow you to refuse cookies if you wish by changing the settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.allaboutcookies.org.  </span>
                </div>
            </div>
        </>
    )
}

export default PrivacyPloicy;