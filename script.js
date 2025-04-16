const birthdateInput = document.getElementById('birthdate');
const calculateBtn = document.getElementById('calculate-btn');
const resultElement = document.getElementById('result');

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const birthdate = new Date(birthdateInput.value);
    const now = new Date();

    if (birthdate > now) {
        resultElement.textContent = "You haven't been born yet! 😅";
        return;
    }

    const age = calculateFullAge(birthdate, now);

    resultElement.innerHTML = `
        <strong>You're exactly:</strong><br>
        ${age.years} Years<br>
        ${age.months} Months<br>
        ${age.days} Days<br>
        ${age.hours} Hours<br>
        ${age.minutes} Minutes
    `;
});

function calculateFullAge(birthdate, now) {
    let years = now.getFullYear() - birthdate.getFullYear();
    let months = now.getMonth() - birthdate.getMonth();
    let days = now.getDate() - birthdate.getDate();
    let hours = now.getHours() - birthdate.getHours();
    let minutes = now.getMinutes() - birthdate.getMinutes();

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes };
}
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    modeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});
