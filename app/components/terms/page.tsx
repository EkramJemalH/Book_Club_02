export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-[#2d2a24] mb-4 font-libertinus">Terms &amp; Conditions</h1>
        <p className="text-gray-500 mb-8">Last updated: August 10, 2026</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg">
            Welcome to <strong>BookClub</strong>. By accessing or using this website, 
            you agree to these Terms &amp; Conditions.
          </p>
          <p className="mt-4">
            If you do not agree with these terms, please do not use the website.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">1. Use of the Website</h2>
          <p>You agree to use this website only for lawful purposes and in accordance with these Terms &amp; Conditions.</p>
          <p className="mt-2">You must not use the website to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to the website</li>
            <li>Interfere with the operation or security of the website</li>
            <li>Upload or submit harmful or malicious content</li>
            <li>Misuse information or services provided through the website</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">2. Website Content</h2>
          <p>
            The content available on this website, including text, images, graphics, logos, 
            and other materials, is provided for general informational purposes.
          </p>
          <p className="mt-2">
            We make reasonable efforts to keep information accurate and up to date, but 
            we do not guarantee that all information will always be complete, accurate, or current.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">3. Intellectual Property</h2>
          <p>
            Unless otherwise stated, the content and materials available on this website 
            belong to <strong>BookClub</strong> or are used with permission.
          </p>
          <p className="mt-2">
            You may not reproduce, distribute, modify, or commercially use website content 
            without appropriate permission.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">4. Third-Party Services and Links</h2>
          <p>
            Our website may contain links to or integrate with third-party websites, APIs, or services.
          </p>
          <p className="mt-2">
            We are not responsible for the content, availability, security, or privacy practices 
            of third-party services.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">5. Availability</h2>
          <p>
            We do not guarantee that the website will always be available, uninterrupted, 
            or free from errors.
          </p>
          <p className="mt-2">
            We may modify, suspend, or discontinue parts of the website at any time.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            To the extent permitted by applicable law, <strong>BookClub</strong> will not 
            be responsible for losses or damages resulting from the use of, or inability to use, 
            the website.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">7. Changes to These Terms</h2>
          <p>
            We may update these Terms &amp; Conditions from time to time.
          </p>
          <p className="mt-2">
            When changes are made, the updated version will be posted on this page with a 
            new &quot;Last updated&quot; date.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">8. Governing Law</h2>
          <p>
            These Terms &amp; Conditions shall be governed by the applicable laws of 
            <strong> United States</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-[#2d2a24] mt-8 mb-4">9. Contact Us</h2>
          <p>If you have questions about these Terms &amp; Conditions, contact us at:</p>
          <ul className="list-none mt-2">
            <li><strong>Email:</strong> <a href="mailto:bookclub@example.com" className="text-[#D3A376] hover:underline">bookclub@example.com</a></li>
            <li><strong>Website:</strong> <a href="/" className="text-[#D3A376] hover:underline">bookclub.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}