const birthdateInput = document.getElementById('birthdate');
const calculateBtn = document.getElementById('calculate-btn');
const resultElement = document.getElementById('result');
const extraInfoElement = document.getElementById('extra-info');

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const birthdate = new Date(birthdateInput.value);
    const now = new Date();

    if (birthdate > now) {
        resultElement.textContent = "You haven't been born yet! 😅";
        extraInfoElement.textContent = "";
        return;
    }

    const age = calculateFullAge(birthdate, now);
    const untilNextBirthday = getTimeUntilNextBirthday(birthdate, now);

    resultElement.innerHTML = `
        <strong>You're exactly:</strong><br>
        ${age.years} Years<br>
        ${age.months} Months<br>
        ${age.days} Days<br>
        ${age.hours} Hours<br>
        ${age.minutes} Minutes
    `;

    extraInfoElement.innerHTML = `
        <br><strong>Time until your next birthday:</strong><br>
        ${untilNextBirthday.months} Months, ${untilNextBirthday.days} Days
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

function getTimeUntilNextBirthday(birthdate, now) {
    const thisYearBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    let nextBirthday = thisYearBirthday > now ? thisYearBirthday : new Date(now.getFullYear() + 1, birthdate.getMonth(), birthdate.getDate());

    const diff = nextBirthday - now;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    return { months, days };
}

const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    modeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});
