
const DateTime = () => {

    let date = new Date();
    let options = {
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
    };
    var fmt = new Intl.DateTimeFormat('en-US', options);
    let displayDate = fmt.format(date);

    // document.getElementById("date").innerHTML = displayDate;

    return (

        <span>{displayDate}</span>
    )
            



}


export default DateTime;
