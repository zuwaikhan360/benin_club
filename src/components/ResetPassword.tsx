import User from '@/models/user.model';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = await User.findOneAndUpdate(
      { 'verificationToken.token': token },
      { $set: { password } },
      { new: true }
    );
    // Clear the verification token from the user object
    await user.updateOne({ $unset: { verificationToken: 1 } });
    // Redirect the user to the login page
    router.replace('/login');
  }

  // Render password reset form
  return (
    <form onSubmit={handleSubmit}>
      <label>
        New password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Reset password</button>
    </form>
  );
}
