// === TOTP-based 2FA ===
// Unlike SMS 2FA (which is vulnerable to SIM swapping), TOTP is a mathematical handshake between your server and the user's phone that workd offline.
// 
// === The Secret Seed ===
// 1. Generation: Your server generates a unique Base32 Secret.
// 2. The QR Code: You display this secret as a QR code. The user scans it with an app (Google Authenticator).
// 3. The Algorithm: Both the server and the app use the secret + the current time to generate a 6-digit code.
// 4. Verification: When the user enters the code, your server checks if it matches the locally generated one.


// MICROLAB
// Use the 'otplib' and 'qrcode' libraries to generate a 2FA setup for a user.
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

// 1. Generate Secret for User
const generate2FA = async (userEmail) => {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(userEmail, 'MySecureApp', secret);

    // 2. Generate QR Code for Frontend
    const qrCodeUrl = await QRCode.toDataURL(otpauth);

    // 3. SAVE 'secret' to User model in DB (Encrypted!)
    return { secret, qrCodeUrl };
}

// 4. Verify the 6-degit Token
const verifyToken = (userSecret, token) => {
    return authenticator.check(token, userSecret);
}