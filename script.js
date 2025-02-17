

const birthdateInput = document.getElementById('birthdate');
const calculateBtn = document.getElementById('calculate-btn');
const resultElement = document.getElementById('result');

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const birthdate = new Date(birthdateInput.value);
    const today = new Date();
    const age = calculateAge(birthdate, today);

    resultElement.textContent = `You are ${age} years old.`;
});

function calculateAge(birthdate, today) {
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1;
    }

    return age;
}
