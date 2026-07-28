import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Initialize RESEND_API_KEY as an Edge Function Secret in your Supabase Dashboard
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

// The email address that will receive the notification
// TODO: Replace this with the actual admin email address
const ADMIN_EMAIL = "shadowsofelite07@gmail.com"

serve(async (req) => {
  try {
    // We expect a Database Webhook payload which contains the inserted row in `record`
    const payload = await req.json()
    const { record } = payload

    // Fallback if record is missing
    if (!record) {
      return new Response(JSON.stringify({ error: "Missing record payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2F3E46;">New Tour Request Submitted</h2>
        <p>A new inquiry was received from the Little Stars Academy website:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Parent Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${record.parent_name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone Number:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${record.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Child's Age:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${record.child_age || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Preferred Program:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${record.preferred_program || 'Not Specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${record.message || 'No additional message.'}</td>
          </tr>
        </table>
        
        <p style="margin-top: 30px; font-size: 14px; color: #888;">
          This is an automated message from the Little Stars Academy Supabase Backend.
        </p>
      </div>
    `

    // Make a request to the Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // Note: For testing, Resend allows sending from onboarding@resend.dev to the verified email address
        from: "Little Stars Academy <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `New Tour Request: ${record.parent_name}`,
        html: htmlBody,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
