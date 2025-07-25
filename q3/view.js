document.addEventListener("DOMContentLoaded", function () {
    const proposalsList = document.getElementById("proposals-list");
  
    function getProposals() {
      return JSON.parse(localStorage.getItem("proposals")) || [];
    }
  
    function saveProposals(proposals) {
      localStorage.setItem("proposals", JSON.stringify(proposals));
    }
  
    function deleteProposal(id) {
      const proposals = getProposals().filter(p => p.id !== id);
      saveProposals(proposals);
      renderItems();
    }
  
    function updateProposalStatus(id, newStatus) {
      const proposals = getProposals().map(p => {
        if (p.id === id) {
          return { ...p, status: newStatus };
        }
        return p;
      });
      saveProposals(proposals);
      renderItems();
    }
  
    function renderItems() {
      proposalsList.innerHTML = "";
  
      const proposals = getProposals();
      
      renderEmotionStats(proposals);

      if (proposals.length === 0) {
        proposalsList.innerHTML = "<p>אין הצעות שמורות.</p>";
        return;
      }
  
      proposals.forEach(proposal => {
        const card = document.createElement("div");
        card.className = "proposal-card";
        card.innerHTML = `
          <h3>${proposal.showName}</h3>
          <p><strong>רגש:</strong> ${proposal.emotion}</p>
          <p><strong>אינטנסיביות:</strong> ${proposal.intensity}</p>
          <p><strong>מגבלת גיל:</strong> ${proposal.ageLimit}</p>
          <p><strong>סטטוס:</strong> ${proposal.status}</p>
          <button class="approve-btn" data-id="${proposal.id}">אשר</button>
          <button class="reject-btn" data-id="${proposal.id}">דחה</button>
          <button class="delete-btn" data-id="${proposal.id}">מחק</button>
        `;
        proposalsList.appendChild(card);
      });
  
      document.querySelectorAll(".approve-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          updateProposalStatus(btn.getAttribute("data-id"), "אושרה");
        });
      });
  
      document.querySelectorAll(".reject-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          updateProposalStatus(btn.getAttribute("data-id"), "נדחתה");
        });
      });
  
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          deleteProposal(btn.getAttribute("data-id"));
        });
      });
    }
      
    function renderEmotionStats(proposals) {
      const statsDiv = document.getElementById("emotion-stats");
      
      if (!statsDiv) return; 

      const counts = {
        "שמחה": 0,
        "פחד": 0,
        "בלבול": 0,
        "געגוע": 0
      };
    
      proposals.forEach(p => {
        if (counts[p.emotion] !== undefined) {
          counts[p.emotion]++;
        }
      });
    
      statsDiv.innerHTML = `
        <p><strong>שמחה:</strong> ${counts["שמחה"]} | 
        <strong>פחד:</strong> ${counts["פחד"]} | 
        <strong>בלבול:</strong> ${counts["בלבול"]} | 
        <strong>געגוע:</strong> ${counts["געגוע"]}</p>
      `;
    }

    renderItems();
});
