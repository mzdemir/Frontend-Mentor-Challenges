export default function Report(props) {
  return (
    <>
      {
        props.data.map((data, index) =>
          <section className="report-card" key={index}>
            <div className="report-icon">
              <img src={`/images/icon-${data.title.toLowerCase().replace(' ', '-')}.svg`} alt="" />
            </div>
            <div className="report-info">
              <h3>{data.title} <img src="./images/icon-ellipsis.svg" alt="" /></h3>
              <div className="time-info">
                <p>{data.timeframes[props.time].current}hrs</p>
                {props.time === "daily" ? (
                  <span>Yesterday - {data.timeframes[props.time].previous}hrs</span>
                ) : props.time === "weekly" ? (
                  <span>Last Week - {data.timeframes[props.time].previous}hrs</span>
                ) : (
                  <span>Last Month - {data.timeframes[props.time].previous}hrs</span>
                )}

              </div>

            </div>
          </section>
        )
      }
    </>
  )
} 