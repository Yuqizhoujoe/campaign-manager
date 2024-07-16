<p><a target="_blank" href="https://app.eraser.io/workspace/5LZtR5zhZ7DMnJkKh6TZ" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Tech Stacks
Language: TypeScript

Frontend: React, `Chart.js` 

Backend: Node.js, Express

Database: Google datastore

Cloud: GCP

Diagram: Eraser 

# API Design
![Campaign Manager Dashbaord](/.eraser/5LZtR5zhZ7DMnJkKh6TZ___U806QwDlsSPtLlAvlCOgMCkeE3W2___---figure----b7p6vBU3140GsUjOgLA1---figure---rvaFkUKilZvezA5uUd_h5w.png "Campaign Manager Dashbaord")

## Entity
- Account
- Campaign
- Report
Each platform can have multiple campaigns

Each account can have multiple campaigns

## Account
```
Account {
  id: string;
  title: string;
  status: "ACTIVE" | "DISABLED";
  created_at: timestamp;
  updated_at: timestamp;
}
```
```
POST
url: `/platforms/${platform_id}/accounts`
data: {
  title: string;
}

response[200]: Account
```
```
GET
url: `/platforms/${platform_id}/accounts/`

response[200]: Account[]

GET
url: `/platforms/{platform_id}/accounts/${account_id}`

response[200]: Account
```
## Campaign
```
Campaign {
  campaign_id: string;
  campaign_name: string;
  account_id: string;
  status: "ACTIVE" | "DISABLED";
  type: string;
  daily_budget: string;
  schedule: {
    start: timestamp;
    end: timestamp;
  }
  created_at: timestamp;
  updated_at: timestamp;
}
```
### Create Campaign
```
POST
url: `/platforms/${platform_id}/accounts/${account_id}/campaigns`
data: {
  campaign_name: string;
  type: string;
  daily_budget: string;
  schedule: {
    start: timestamp;
    end: timestamp;
  }
}

response[200]: Campaign
```
### Get Campaign
```
GET
url: `/platforms/${platform_id}/accounts/${account_id}/campaigns`

response[200]: Campaign[]

GET
url: `/platforms/${platform_id}/accounts/${account_id}/campaigns/${campaign_id}`

response[200]: Campaign
```
## Report
```
Report {
  id: string;
  report_name: string;
  date: timestamp;
  account_id: string;
  account_name: string;
  campaign_id: string;
  campaign_name: string;
  imp_count: string;
  click_count: string;
  money_spent: string;
  revenue: string;
  roas: number;
  cpc: number;
  ctr: string;
  cpm: number;
}
```
### Query by platform
```
GET
url: `platforms/${platform_id}/reports

response[200]: Report[]
```
### Query by account
```
GET
url: `platforms/${platform_id}/accounts/${account_id}/reports`

response[200]: Report[]
```








<!--- Eraser file: https://app.eraser.io/workspace/5LZtR5zhZ7DMnJkKh6TZ --->