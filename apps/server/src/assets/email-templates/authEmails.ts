export const signupreq = (url: string) => ({
  subject: 'Complete Your Failean Account Setup',
  body: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Complete Your Failean Account Setup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a.activate-button {
            background-color: #8A307F;  /* Changed to match your brand color */
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>Welcome to Failean</h2>
    </div>

    <div class="content">
        <p>Hello,</p>
        <p>We're excited that you've chosen to join Failean, the platform that supports a smarter approach to entrepreneurship. Before you dive in, please complete your account setup.</p>

        <a href="${url}" class="activate-button">Complete Setup</a>

        <p>If this wasn't you, please ignore this email.</p>

        <h3>Your Thoughts Matter</h3>
        <p>We value your insights as we continually strive to improve. Once you've had a chance to use our platform, we'd appreciate your feedback. Feel free to reply to this email with your thoughts.</p>

        <p>Best wishes,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>Unsubscribe | &copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>
</body>
</html>
  `
});

export const passreset = (url: string) => ({
  subject: 'Reset Your Password - Failean',
  body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Failean</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-sizing: border-box;
        }
        .header, .footer {
            background-color: #8A307F;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px;
        }
        a.button {
            background-color: #8A307F; /* Updated to match brand color */
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .content {
                padding: 15px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Password Reset Instructions</h2>
    </div>

    <div class="content">
        <p>Hello,</p>

        <p>We've received a request to reset your Failean account password. If this was you, please click the button below to set up a new password:</p>

        <a href="${url}" class="button">Reset Password</a>

        <p>If you didn't initiate this request, you can safely ignore this email or contact our support.</p>

        <p>Warm regards,<br><strong>The Failean Team</strong></p>
    </div>

    <div class="footer">
        <p>Unsubscribe | &copy; 2023 Failean LLC, All rights reserved.</p>
    </div>
</div>

</body>
</html>
    `
});
