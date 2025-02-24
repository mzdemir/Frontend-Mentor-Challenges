/* eslint-disable react/prop-types */
export default function Thanks(props) {
  return (
    <main className="thanks-container">
      <img src="./images/illustration-thank-you.svg" alt="illustration thank you" />
      <p>You selected {props.rating} out of 5</p>
      <h2>Thank you!</h2>
      <p>We appreciate you taking the time to give a rating.
        If you ever need more support, don’t hesitate to get in touch!
      </p>
    </main>
  )
}