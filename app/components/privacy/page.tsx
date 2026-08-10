export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-[#2d2a24] mb-4 font-libertinus">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: August 10, 2026</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg">
            Welcome to <strong>BookClub</strong>. This Privacy Policy explains how we collect, use, 
            and protect information when you use our website.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect information that you voluntarily provide when using our website, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Contact information</li>
            <li>Information submitted through forms</li>
            <li>Any messages or inquiries you send to us</li>
          </ul>
          <p className="mt-2">We may also automatically collect basic technical information such as browser type, device type, and pages visited.</p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We may use collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our services</li>
            <li>Respond to inquiries</li>
            <li>Process requests submitted through the website</li>
            <li>Improve the website experience</li>
            <li>Maintain website security</li>
            <li>Communicate with users when necessary</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">3. Cookies</h2>
          <p>
            Our website may use cookies or similar technologies to improve functionality and 
            understand how visitors use the website.
          </p>
          <p className="mt-2">
            You can disable cookies through your browser settings. However, some website features 
            may not work properly as a result.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">4. Third-Party Services</h2>
          <p>
            Our website may use third-party services such as analytics tools, hosting providers, 
            APIs, or other services necessary for website functionality.
          </p>
          <p className="mt-2">These services may collect information according to their own privacy policies.</p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">5. Data Security</h2>
          <p>
            We take reasonable measures to protect information submitted through our website. 
            However, no method of transmitting or storing information online can be guaranteed 
            to be completely secure.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">6. Children's Privacy</h2>
          <p>
            Our website is not intentionally designed to collect personal information from children.
          </p>
          <p className="mt-2">
            If you believe that a child has provided personal information through our website, 
            please contact us so that we can take appropriate action.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information, 
            including the right to request access, correction, or deletion of your information.
          </p>
          <p className="mt-2">To make a request, contact us using the information below.</p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on 
            this page with an updated &quot;Last updated&quot; date.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at:</p>
          <ul className="list-none mt-2">
            <li><strong>Email:</strong> <a href="mailto:bookclub@example.com" className="text-[#D3A376] hover:underline">bookclub@example.com</a></li>
            <li><strong>Website:</strong> <a href="/" className="text-[#D3A376] hover:underline">bookclub.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}