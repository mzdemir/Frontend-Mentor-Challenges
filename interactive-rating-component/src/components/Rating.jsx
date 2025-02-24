import { useState } from "react"
import Thanks from "./Thanks"


export default function Rating() {
  const [rating, setRating] = useState(null)
  const [submitted, setSubmitted] = useState(false);

  const selectRating = (rating, e) => {
    e.preventDefault();
    setRating(rating);
  };

  const handleSubmit = () => {
    if (rating) {
      setSubmitted(true);
    }
  };

  return (
    <>
      {!submitted ? (
        <main className="rating-container">
          <img src="./images/icon-star.svg" alt="icon star" />
          <h2>How did we do?</h2>
          <p>Please let us know how we did with your support request.
            All feedback is appreciated to help us improve our offering!
          </p>
          <form className="rating-form" action="">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`rating-btn ${rating === num ? "active" : ""}`}
                onClick={(e) => selectRating(num, e)}
                type="button"
                aria-pressed={rating === num}>
                {num}
              </button>
            ))}
          </form>
          <button className="submit-btn" onClick={handleSubmit}>
            SUBMIT
          </button>
        </main>
      ) : (
        <div aria-live="polite">
          <Thanks rating={rating} />
        </div>
      )
      }
    </>
  )
}
