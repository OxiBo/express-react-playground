const sendgrid = require("sendgrid"),
  keys = process.env.SENDGRID_API_KEY;
const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor(
    { subject, recipients, from_email = "no-reply@learningtocode.com" },
    content
  ) {
    super();

    this.sgApi = sendgrid(keys);
    this.from_email = new helper.Email(from_email);
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients =  this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

    formatAddresses(recipients) {
        // console.log('======')
        // console.log(recipients)
      return recipients.map(({ email }) => {
        return new helper.Email(email);
      });
    }

    addClickTracking() {
      const trackingSettings = new helper.TrackingSettings();
      const clickTracking = new helper.ClickTracking(true, true);
      trackingSettings.setClickTracking(clickTracking);
      this.addTrackingSettings(trackingSettings);
    }

 
  addRecipients() {
    //   console.log(this.recipients)
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
      this.addPersonalization(personalize);
    });
  }

  async send() {
    //   console.log(this.toJSON())
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    // console.log(request)
    const response = await this.sgApi.API(request);
    // console.log(response)
    return response;
  }
}

module.exports = Mailer;
