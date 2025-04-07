import React from 'react';

interface Props {
  name: string;
  verificationTime: string;
}

const RegistrationCompleted: React.FC<Props> = ({ name, verificationTime }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <p className="mb-4">
        Dear {name}, thank you for registering with the Benin Club website. We
        have received your registration form and we&apos;re delighted to have
        you as a member of our community.
      </p>
      <p className="mb-4">
        Please note that your registration is not yet complete. We will now
        begin the process of verifying your account details. This process can
        take up to {verificationTime}, depending on the volume of registrations
        we receive.
      </p>
      <p className="mb-4">
        In the meantime, we invite you to explore our website and discover all
        the exciting activities we offer. From social events and cultural
        gatherings to sports and fitness, the Benin Club has something for
        everyone.
      </p>
      <p className="mb-4">
        Once your account has been successfully verified, we will send you a
        confirmation email with further instructions on how to fully access our
        website and start enjoying all the benefits of membership.
      </p>
      <p className="mb-4">
        Thank you for your patience during this verification process. We&apos;re
        excited to have you on board and we look forward to seeing you at our
        next event.
      </p>
    </div>
  );
};

export default RegistrationCompleted;
