//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Milestone {
        string name;
        uint256 goal;
        uint256 funds;
    }

    struct Campaign {
        string name;
        string creatorName;
        string description;
        address payable creator;
        uint256 goal;
        uint256 funds;
        bool completed;
        Milestone[] milestones;
    }

    Campaign[] public activeCampaigns;
    Campaign[] public completedCampaigns;

    event CampaignCreated(uint256 campaignId, string name, string creatorName, address creator, uint256 goal);
    event CampaignCompleted(uint256 campaignId, uint256 totalFunds);
    event UserVerified(address indexed user, string message);

    function logUserVerification(string memory _message) public {
        emit UserVerified(msg.sender, _message);
    }

    function createCampaign(
        string memory _name,
        string memory _creatorName,
        string memory _description,
        uint256 _goal,
        string[] memory _milestoneNames,
        uint256[] memory _milestoneGoals
    ) public {
        require(_goal > 0, "Goal must be greater than 0");
        require(_milestoneNames.length == _milestoneGoals.length, "Milestone names and goals mismatch");

        uint256 totalMilestoneGoals = 0;
        for (uint256 i = 0; i < _milestoneGoals.length; i++) {
            totalMilestoneGoals += _milestoneGoals[i];
        }
        require(totalMilestoneGoals == _goal, "Milestone goals must add up to the total goal");

        Campaign storage newCampaign = activeCampaigns.push();
        newCampaign.name = _name;
        newCampaign.creatorName = _creatorName;
        newCampaign.description = _description;
        newCampaign.creator = payable(msg.sender);
        newCampaign.goal = _goal;

        for (uint256 i = 0; i < _milestoneNames.length; i++) {
            newCampaign.milestones.push(Milestone({
                name: _milestoneNames[i],
                goal: _milestoneGoals[i],
                funds: 0
            }));
        }

        emit CampaignCreated(activeCampaigns.length - 1, _name, _creatorName, msg.sender, _goal);
    }

    function donateToMilestone(uint256 _campaignId, uint256 _milestoneId) public payable {
        require(_campaignId < activeCampaigns.length, "Invalid campaign ID");
        Campaign storage campaign = activeCampaigns[_campaignId];
        require(!campaign.completed, "Campaign already completed");

        require(_milestoneId < campaign.milestones.length, "Invalid milestone ID");
        require(msg.value > 0, "Donation must be greater than 0");

        Milestone storage milestone = campaign.milestones[_milestoneId];
        require(milestone.funds + msg.value <= milestone.goal, "Donation exceeds milestone goal");

        milestone.funds += msg.value;
        campaign.funds += msg.value;

        // Check if milestone and campaign goals are met
        if (milestone.funds == milestone.goal && campaign.funds == campaign.goal) {
            campaign.completed = true;

            // Move campaign to completedCampaigns
            completedCampaigns.push(campaign);

            // Remove campaign from activeCampaigns by replacing it with the last one
            activeCampaigns[_campaignId] = activeCampaigns[activeCampaigns.length - 1];
            activeCampaigns.pop();

            emit CampaignCompleted(_campaignId, campaign.funds);
        }
    }

    function getActiveCampaigns() public view returns (Campaign[] memory) {
        return activeCampaigns;
    }

    function getCompletedCampaigns() public view returns (Campaign[] memory) {
        return completedCampaigns;
    }
}