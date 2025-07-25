document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("show-form");
    const messagesDiv = document.getElementById("messages");
  
    function getProposals() {
      return JSON.parse(localStorage.getItem("proposals")) || [];
    }
  
    function saveProposals(proposals) {
      localStorage.setItem("proposals", JSON.stringify(proposals));
    }
  
    function addProposal(proposal) {
      const proposals = getProposals();
      proposals.push(proposal);
      saveProposals(proposals);
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      messagesDiv.innerHTML = "";
  
      const errors = [];
  
      const showName = document.getElementById("show-name").value.trim();
      const emotion = document.getElementById("emotion").value;
      const participation = document.getElementById("participation").value;
      const equipment = document.getElementById("equipment").value.trim();
      const intensity = document.getElementById("intensity").value.trim();
      const ageLimit = document.getElementById("age-limit").value.trim();
      const email = document.getElementById("creator-email").value.trim();
  
      if (showName === "") errors.push("יש להזין שם מופע.");
      if (emotion === "") errors.push("יש לבחור רגש מרכזי.");
      if (participation === "") errors.push("יש לציין אם נדרשת השתתפות.");
      if (intensity === "" || isNaN(intensity) || intensity < 1 || intensity > 5)
        errors.push("דרגת האינטנסיביות חייבת להיות בין 1 ל-5.");
      if (ageLimit === "" || isNaN(ageLimit) || ageLimit < 0)
        errors.push("מגבלת גיל חייבת להיות מספר חיובי.");
      else if (intensity > 3 && ageLimit < 12)
        errors.push("לדרגת אינטנסיביות זו: גיל 12 ומעלה");
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "" || !emailPattern.test(email))
        errors.push("יש להזין כתובת אימייל תקינה.");
  
      if (errors.length > 0) {
        errors.forEach(err => {
          const p = document.createElement("p");
          p.className = "error";
          p.textContent = err;
          messagesDiv.appendChild(p);
        });

      } else {
        const proposal = {
          id: Date.now().toString(),
          showName,
          emotion,
          participation,
          equipment,
          intensity,
          ageLimit,
          email,
          status: "ממתינה"
        };
  
        addProposal(proposal);
  
        const successMsg = document.createElement("p");
        successMsg.className = "success";
        successMsg.textContent = "ההצעה נשמרה בהצלחה!";
        messagesDiv.appendChild(successMsg);
  
        form.reset();
      }
    });
  });
  