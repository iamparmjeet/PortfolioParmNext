import type { ContactValues } from "@/lib/contact";

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

/**
 * Design Tokens for the Rose Palette (Light):
 * - Background: #F1E6E0 (soft blush rose linen)
 * - Card/Paper: #FAEFE9 (clean warm rose white)
 * - Accent: #A8324E (deep editorial rose)
 * - Accent Tint: rgba(168, 50, 78, 0.08)
 * - Accent Soft: #C94C6B (vibrant rose for buttons/highlights)
 * - Ink / Dark text: #1F1611 (deep espresso)
 * - Ink Soft: #4F3F36 (warm muted text)
 * - Ink Muted: #8A7468 (subtle captions/labels)
 * - Rule / Border: #D8C0B4 (soft rose-taupe border)
 * - Rule Soft: #EAD5C8 (inner table dividing lines)
 * - Box Shadow: 0 12px 36px rgba(31, 22, 17, 0.06)
 */

/**
 * HTML email sent to Parmjeet (Site Owner) when a visitor submits the contact form.
 */
export function renderOwnerNotificationHtml(data: ContactValues): string {
	const name = escapeHtml(data.name);
	const email = escapeHtml(data.email);
	const inquiryType = escapeHtml(data.inquiryType);
	const company = data.company ? escapeHtml(data.company) : null;
	const message = escapeHtml(data.message);

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry from ${name}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1E6E0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F1611; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F1E6E0; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #FAEFE9; border: 1px solid #D8C0B4; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 36px rgba(31, 22, 17, 0.06);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #A8324E, #C94C6B); line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header Bar -->
          <tr>
            <td style="padding: 26px 32px; background-color: #FAEFE9; border-bottom: 1px solid #EAD5C8;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #1F1611; letter-spacing: -0.02em;">
                      Parmjeet<span style="color: #A8324E;">.</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #A8324E; background-color: rgba(168, 50, 78, 0.08); border: 1px solid rgba(168, 50, 78, 0.22); padding: 5px 12px; border-radius: 6px; font-weight: 600;">
                      New Message
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 6px 0; font-family: Georgia, serif; font-size: 24px; font-weight: 600; color: #1F1611; letter-spacing: -0.01em;">
                Inquiry from <span style="color: #A8324E;">${name}</span>
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 12.5px; color: #8A7468; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                Submitted via parmjeetmishra.com/contact
              </p>

              <!-- Meta Table -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #F7EAE3; border-radius: 10px; border: 1px solid #D8C0B4;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #EAD5C8; font-size: 11px; color: #8A7468; font-family: ui-monospace, monospace; width: 100px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">SENDER</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #EAD5C8; font-size: 14px; color: #1F1611; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #EAD5C8; font-size: 11px; color: #8A7468; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">EMAIL</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #EAD5C8; font-size: 14px; color: #A8324E; font-weight: 500;">
                    <a href="mailto:${email}" style="color: #A8324E; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; ${company ? "border-bottom: 1px solid #EAD5C8;" : ""} font-size: 11px; color: #8A7468; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">TOPIC</td>
                  <td style="padding: 12px 16px; ${company ? "border-bottom: 1px solid #EAD5C8;" : ""} font-size: 14px; color: #1F1611;">${inquiryType}</td>
                </tr>
                ${
									company
										? `<tr>
                  <td style="padding: 12px 16px; font-size: 11px; color: #8A7468; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">COMPANY</td>
                  <td style="padding: 12px 16px; font-size: 14px; color: #1F1611;">${company}</td>
                </tr>`
										: ""
								}
              </table>

              <!-- Message Block -->
              <div style="margin-bottom: 28px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.12em; color: #8A7468; font-weight: 600;">
                  Message Content
                </p>
                <div style="background-color: #F7EAE3; border-left: 3px solid #A8324E; padding: 18px 20px; border-radius: 0 8px 8px 0; font-size: 14.5px; line-height: 1.65; color: #1F1611; white-space: pre-wrap;">${message}</div>
              </div>

              <!-- Quick Action CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-top: 6px;">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(inquiryType)}%20-%20Parmjeet%20Mishra" style="display: inline-block; background-color: #A8324E; color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 13px 32px; border-radius: 8px; letter-spacing: 0.02em; box-shadow: 0 2px 8px rgba(168, 50, 78, 0.25);">
                      Reply directly to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F1E6E0; border-top: 1px solid #EAD5C8; text-align: center;">
              <p style="margin: 0; font-family: ui-monospace, monospace; font-size: 11px; color: #8A7468; letter-spacing: 0.04em;">
                Parmjeet Mishra · Full-Stack React Developer · Ludhiana, India
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * HTML email sent to the Visitor (Sender Confirmation) confirming receipt.
 */
export function renderSenderConfirmationHtml(data: ContactValues): string {
	const name = escapeHtml(data.name);

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1E6E0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F1611; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F1E6E0; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #FAEFE9; border: 1px solid #D8C0B4; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 36px rgba(31, 22, 17, 0.06);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #A8324E, #C94C6B); line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header Bar -->
          <tr>
            <td style="padding: 26px 32px; background-color: #FAEFE9; border-bottom: 1px solid #EAD5C8;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #1F1611; letter-spacing: -0.02em;">
                      Parmjeet<span style="color: #A8324E;">.</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #A8324E; background-color: rgba(168, 50, 78, 0.08); border: 1px solid rgba(168, 50, 78, 0.22); padding: 5px 12px; border-radius: 6px; font-weight: 600;">
                      Received
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 12px 0; font-family: Georgia, serif; font-size: 24px; font-weight: 600; color: #1F1611;">
                Thank you for reaching out, ${name}.
              </h1>
              <p style="margin: 0 0 22px 0; font-size: 15px; line-height: 1.65; color: #4F3F36;">
                I've received your note and wanted to confirm it landed safely. I personally review every inquiry and typically reply within <strong>4–8 hours</strong> on weekdays (IST).
              </p>

              <!-- In the meantime box -->
              <div style="background-color: #F7EAE3; border-left: 3px solid #A8324E; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 26px;">
                <p style="margin: 0 0 6px 0; font-size: 11px; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.12em; color: #A8324E; font-weight: 600;">
                  In the meantime
                </p>
                <p style="margin: 0; font-size: 13.5px; line-height: 1.6; color: #4F3F36;">
                  Feel free to check out my recent case studies, technical projects, or ask questions to my interactive AI assistant at <a href="https://parmjeetmishra.com" style="color: #A8324E; text-decoration: underline; font-weight: 500;">parmjeetmishra.com</a>.
                </p>
              </div>

              <!-- Button CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <a href="https://parmjeetmishra.com/work" style="display: inline-block; background-color: #A8324E; color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 13px 26px; border-radius: 8px; letter-spacing: 0.02em; box-shadow: 0 2px 8px rgba(168, 50, 78, 0.25);">
                      Explore Projects & Work &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 32px; background-color: #F1E6E0; border-top: 1px solid #EAD5C8; text-align: center;">
              <p style="margin: 0 0 4px 0; font-family: ui-monospace, monospace; font-size: 11px; color: #8A7468; letter-spacing: 0.04em;">
                Parmjeet Mishra · Full-Stack React Developer
              </p>
              <p style="margin: 0; font-family: ui-monospace, monospace; font-size: 10px; color: #8A7468; letter-spacing: 0.04em;">
                Ludhiana, India · <a href="https://parmjeetmishra.com" style="color: #A8324E; text-decoration: none;">parmjeetmishra.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
