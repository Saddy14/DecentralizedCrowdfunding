console.log("Ethers.js loaded:", typeof ethers !== "undefined");

let provider, signer, contract;
const contractAddress = "0x7F57Db064Da6594C841E55C77d199cC6237E14F2"; // Replace with your deployed contract address
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalFunds",
        "type": "uint256"
      }
    ],
    "name": "CampaignCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "creatorName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      }
    ],
    "name": "CampaignCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "UserVerified",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "activeCampaigns",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "creatorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address payable",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "funds",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "completedCampaigns",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "creatorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address payable",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "funds",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "logUserVerification",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_creatorName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_goal",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "_milestoneNames",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_milestoneGoals",
        "type": "uint256[]"
      }
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_campaignId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_milestoneId",
        "type": "uint256"
      }
    ],
    "name": "donateToMilestone",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getActiveCampaigns",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "creatorName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "funds",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "completed",
            "type": "bool"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "goal",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "funds",
                "type": "uint256"
              }
            ],
            "internalType": "struct Crowdfunding.Milestone[]",
            "name": "milestones",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Crowdfunding.Campaign[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getCompletedCampaigns",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "creatorName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "funds",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "completed",
            "type": "bool"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "goal",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "funds",
                "type": "uint256"
              }
            ],
            "internalType": "struct Crowdfunding.Milestone[]",
            "name": "milestones",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Crowdfunding.Campaign[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            document.getElementById("accountDisplay").innerText = `Connected: ${account}`;
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
        } catch (error) {
            console.error("MetaMask connection failed:", error);
        }
    } else {
        alert("MetaMask not installed!");
    }
}

async function validateUser() {
  if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return false;
  }

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  const message = "Confirm your identity for Crowdfunding DApp";
  
  try {
      const signature = await ethereum.request({
          method: 'personal_sign',
          params: [message, account],
      });
      console.log("Signature verified for:", account);
      // Log user verification to the contract
      await contract.logUserVerification(message);
      return account; // Return verified account
  } catch (error) {
      console.error("User verification failed:", error);
      alert("Signature validation failed!");
      return false;
  }
}

async function createCampaign() {
  if (!provider || !contract) {
      alert("Connect MetaMask first!");
      return;
  }

  // Validate input fields before asking for a signature
  const campaignName = document.getElementById("campaignName").value.trim();
  const creatorName = document.getElementById("creatorName").value.trim();
  const description = document.getElementById("campaignDescription").value.trim();
  const goal = parseInt(document.getElementById("goal").value.trim());

  if (!campaignName || !creatorName || !description || isNaN(goal) || goal <= 0) {
      alert("Please fill out all fields correctly before proceeding.");
      return;
  }


  const milestoneNames = [];
  const milestoneGoals = [];
  const milestoneElements = document.querySelectorAll(".milestone");
  milestoneElements.forEach((element) => {
      const name = element.querySelector(".milestoneName").value.trim();
      const milestoneGoal = parseInt(element.querySelector(".milestoneGoal").value.trim());

      if (milestoneGoal <= 0) {
          alert("Please ensure all milestones have valid names and goals.");
          return;
      }

      milestoneNames.push(name);
      milestoneGoals.push(milestoneGoal);
  });

  const totalMilestoneGoals = milestoneGoals.reduce((a, b) => a + b, 0);
  if (totalMilestoneGoals !== goal) {
      alert("The sum of milestone goals must equal the total campaign goal.");
      return;
  }

  // Ask for signature after field validation
  const account = await validateUser(); // Signature verification here
  if (!account) return;

  // Proceed with creating the campaign
  try {
      const tx = await contract.createCampaign(campaignName, creatorName, description, goal, milestoneNames, milestoneGoals);
      await tx.wait();
      alert("Campaign created successfully!");
      resetCreateCampaignForm();
      listActiveCampaigns();
  } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again later.");
  }
}

async function donateToSpecificMilestone(campaignId, milestoneId) {
  const amount = prompt("Enter donation amount (in wei):");
  if (!amount || isNaN(amount) || amount <= 0) {
      alert("Invalid donation amount.");
      return;
  }

  try {
      console.log(`Attempting to donate ${amount} wei to Campaign ${campaignId}, Milestone ${milestoneId}.`);
      const tx = await contract.donateToMilestone(campaignId, milestoneId, {
          value: ethers.utils.parseUnits(amount, "wei"),
      });
      await tx.wait();
      alert("Donation successful!");
      listActiveCampaigns();
      listCompletedCampaigns();
  } catch (error) {
      console.error("Error during donation:", error);
      alert("Failed to donate. Please check the console for details.");
  }
}

async function listActiveCampaigns() {
    if (!provider || !contract) {
        alert("Connect MetaMask first!");
        return;
    }

    try {
        const campaigns = await contract.getActiveCampaigns();
        displayCampaigns(campaigns, "Active");
    } catch (error) {
        console.error("Error fetching active campaigns:", error);
        alert("Failed to fetch active campaigns. Check console for details.");
    }
}

async function listCompletedCampaigns() {
    if (!provider || !contract) {
        alert("Connect MetaMask first!");
        return;
    }

    try {
        const campaigns = await contract.getCompletedCampaigns();
        displayCampaigns(campaigns, "Completed");
    } catch (error) {
        console.error("Error fetching completed campaigns:", error);
        alert("Failed to fetch completed campaigns. Check console for details.");
    }
}

function displayCampaigns(campaigns, status) {
    const container = document.getElementById(
        status === "Active" ? "campaignList" : "completedCampaignList"
    );
    container.innerHTML = "";

    campaigns.forEach((campaign, campaignIndex) => {
        let milestonesHTML = "";

        campaign.milestones.forEach((milestone, milestoneIndex) => {
            milestonesHTML += `
                <div>
                    <p>Milestone ${milestoneIndex + 1}: ${milestone.name} - Goal: ${milestone.goal} wei, Funds: ${milestone.funds} wei</p>
                    ${status === "Active" ? `
                        <button class="donateButton" 
                                data-campaign-id="${campaignIndex}" 
                                data-milestone-id="${milestoneIndex}">
                            Donate to Milestone
                        </button>` 
                    : ""}
                </div>`;
        });

        const campaignHTML = `
            <div>
                <h3>${status} Campaign ${campaignIndex + 1}</h3>
                <p>Name: ${campaign.name}</p>
                <p>Creator: ${campaign.creatorName}</p>
                <p>Goal: ${campaign.goal} wei</p>
                <p>Funds Raised: ${campaign.funds} wei</p>
                ${milestonesHTML}
            </div>
            <hr>`;
        container.innerHTML += campaignHTML;
    });

    if (status === "Active") {
        const donateButtons = document.querySelectorAll(".donateButton");
        donateButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const campaignId = button.getAttribute("data-campaign-id");
                const milestoneId = button.getAttribute("data-milestone-id");
                donateToSpecificMilestone(campaignId, milestoneId);
            });
        });
    }
}

function resetCreateCampaignForm() {
    document.getElementById("campaignName").value = "";
    document.getElementById("creatorName").value = "";
    document.getElementById("campaignDescription").value = "";
    document.getElementById("goal").value = "";
    const milestonesContainer = document.getElementById("milestonesContainer");
    milestonesContainer.innerHTML = `
        <h3>Milestones</h3>
        <button type="button" id="addMilestone">Add Milestone</button>
    `;
    document.getElementById("addMilestone").onclick = addMilestoneHandler;
}

function addMilestoneHandler() {
    const milestoneContainer = document.createElement("div");
    milestoneContainer.className = "milestone";
    milestoneContainer.innerHTML = `
        <input type="text" class="milestoneName" placeholder="Milestone Name">
        <input type="number" class="milestoneGoal" placeholder="Milestone Goal (wei)">
        <button type="button" class="removeMilestoneButton">Remove Milestone</button>
    `;
    document.getElementById("milestonesContainer").appendChild(milestoneContainer);
    milestoneContainer.querySelector(".removeMilestoneButton").onclick = function () {
        milestoneContainer.remove();
    };
}

document.getElementById("connectButton").onclick = connectMetaMask;
document.getElementById("createCampaign").onclick = createCampaign;
document.getElementById("listCampaigns").onclick = listActiveCampaigns;
document.getElementById("listCompletedCampaigns").onclick = listCompletedCampaigns;
document.getElementById("addMilestone").onclick = addMilestoneHandler;
