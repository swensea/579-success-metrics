// This file contains sample KPI data based on the CSV analysis
// In a real application, this would come from a database

export const kpiData = {
  // Metrics with conflicting definitions across teams
  conflictingMetrics: [
    {
      id: 1,
      name: "Conversion Rate",
      severity: "High",
      teams: ["Sales", "Marketing", "Product"],
      definitions: [
        {
          team: "Sales",
          definition: "Percentage of qualified leads that become paying customers.",
        },
        {
          team: "Marketing",
          definition: "Percentage of website visitors who complete a desired action (form submission, download, etc.).",
        },
        {
          team: "Product",
          definition: "Percentage of free trial users who convert to paid subscriptions.",
        },
      ],
      recommendation:
        "Create a standardized definition with clear context indicators (e.g., 'Marketing Conversion Rate' vs 'Sales Conversion Rate').",
    },
    {
      id: 2,
      name: "Active User",
      severity: "High",
      teams: ["Product", "Marketing", "Data"],
      definitions: [
        {
          team: "Product",
          definition: "A user who has performed a core action in the product within the last 30 days.",
        },
        {
          team: "Marketing",
          definition: "Any user who has logged in at least once in the last 90 days.",
        },
        {
          team: "Data",
          definition: "A user who has completed at least 3 different actions in the product within the last 28 days.",
        },
      ],
      recommendation:
        "Standardize on the Data team's definition as it provides the most meaningful measure of engagement.",
    },
    {
      id: 3,
      name: "Churn Rate",
      severity: "High",
      teams: ["Sales", "Finance", "Customer Success"],
      definitions: [
        {
          team: "Sales",
          definition: "Percentage of customers who cancel their subscription in a given period.",
        },
        {
          team: "Finance",
          definition: "Percentage of recurring revenue lost in a given period compared to the previous period.",
        },
        {
          team: "Customer Success",
          definition: "Percentage of customers who downgrade or cancel their subscription in a given period.",
        },
      ],
      recommendation:
        "Use 'Logo Churn' for customer count metrics and 'Revenue Churn' for financial metrics to avoid confusion.",
    },
    {
      id: 4,
      name: "Qualified Lead",
      severity: "Medium",
      teams: ["Sales", "Marketing"],
      definitions: [
        {
          team: "Sales",
          definition:
            "A prospect that has been researched and vetted by the sales team, meeting specific criteria that align with the ideal customer profile.",
        },
        {
          team: "Marketing",
          definition:
            "A lead that has shown interest through multiple touchpoints and meets demographic and firmographic criteria.",
        },
      ],
      recommendation:
        "Use 'Marketing Qualified Lead (MQL)' and 'Sales Qualified Lead (SQL)' to distinguish between the two definitions.",
    },
    {
      id: 5,
      name: "Customer Acquisition Cost",
      severity: "Medium",
      teams: ["Marketing", "Finance", "Sales"],
      definitions: [
        {
          team: "Marketing",
          definition: "Total marketing spend divided by the number of new customers acquired in a given period.",
        },
        {
          team: "Finance",
          definition:
            "Total sales and marketing expenses divided by the number of new customers acquired in a given period.",
        },
        {
          team: "Sales",
          definition: "Total cost of sales team divided by the number of deals closed in a given period.",
        },
      ],
      recommendation:
        "Use 'Fully-loaded CAC' for the finance definition and 'Marketing CAC' or 'Sales CAC' for the department-specific metrics.",
    },
    {
      id: 6,
      name: "Engagement",
      severity: "Medium",
      teams: ["Marketing", "Product", "Customer Success"],
      definitions: [
        {
          team: "Marketing",
          definition: "Interactions with marketing content, measured by clicks, opens, and social media interactions.",
        },
        {
          team: "Product",
          definition:
            "Frequency and depth of product usage, measured by session duration, feature adoption, and actions per session.",
        },
        {
          team: "Customer Success",
          definition: "Customer responsiveness to outreach and participation in training/onboarding sessions.",
        },
      ],
      recommendation:
        "Use specific terms like 'Marketing Engagement', 'Product Engagement', and 'Customer Engagement' to clarify context.",
    },
    {
      id: 7,
      name: "Retention Rate",
      severity: "Medium",
      teams: ["Product", "Customer Success", "Finance"],
      definitions: [
        {
          team: "Product",
          definition: "Percentage of users who return to the product in a given period after their first use.",
        },
        {
          team: "Customer Success",
          definition: "Percentage of customers who renew their contracts when they come up for renewal.",
        },
        {
          team: "Finance",
          definition: "Percentage of recurring revenue retained from existing customers from one period to the next.",
        },
      ],
      recommendation:
        "Use 'User Retention' for product metrics, 'Customer Retention' for customer success, and 'Revenue Retention' for finance.",
    },
    {
      id: 8,
      name: "Activation",
      severity: "Low",
      teams: ["Product", "Marketing"],
      definitions: [
        {
          team: "Product",
          definition:
            "When a user completes a key action that indicates they've experienced the core value of the product.",
        },
        {
          team: "Marketing",
          definition: "When a lead takes a specific action that indicates high intent, such as requesting a demo.",
        },
      ],
      recommendation: "Use 'Product Activation' and 'Lead Activation' to distinguish between these concepts.",
    },
    {
      id: 9,
      name: "Lifetime Value",
      severity: "Low",
      teams: ["Finance", "Marketing", "Customer Success"],
      definitions: [
        {
          team: "Finance",
          definition:
            "The total revenue a customer is expected to generate over their entire relationship with the company, minus the cost to serve them.",
        },
        {
          team: "Marketing",
          definition:
            "The predicted revenue a customer will generate over their lifetime, used to determine maximum customer acquisition cost.",
        },
        {
          team: "Customer Success",
          definition: "The total value of a customer relationship, including referrals and expansion opportunities.",
        },
      ],
      recommendation:
        "Standardize on the Finance definition but include notes about additional value factors for marketing and customer success contexts.",
    },
    {
      id: 10,
      name: "Integrity Score",
      severity: "Low",
      teams: ["Data", "Product"],
      definitions: [
        {
          team: "Data",
          definition: "Percentage of records with no missing or invalid fields.",
        },
        {
          team: "Product",
          definition: "A measure of system uptime and data consistency during user sessions.",
        },
      ],
      recommendation:
        "Rename the Product metric to 'System Integrity Score' to differentiate it from the Data team's 'Data Integrity Score'.",
    },
  ],

  // Standardized metrics for the glossary
  standardizedMetrics: [
    {
      id: 1,
      name: "Monthly Recurring Revenue (MRR)",
      team: "All",
      definition: "The predictable revenue generated by all active subscriptions in a given month.",
      relatedTerms: ["Annual Recurring Revenue (ARR)", "Revenue"],
    },
    {
      id: 2,
      name: "Net Promoter Score (NPS)",
      team: "All",
      definition:
        "A measure of customer loyalty based on likelihood to recommend, calculated as the percentage of promoters minus the percentage of detractors.",
      relatedTerms: ["Customer Satisfaction", "Customer Effort Score"],
    },
    {
      id: 3,
      name: "Customer Lifetime Value (CLV)",
      team: "All",
      definition:
        "The total revenue a customer is expected to generate over their entire relationship with the company.",
      relatedTerms: ["Customer Acquisition Cost", "LTV:CAC Ratio"],
    },
    {
      id: 4,
      name: "Marketing Qualified Lead (MQL)",
      team: "Marketing",
      definition:
        "A lead that has shown interest through multiple touchpoints and meets demographic and firmographic criteria.",
      relatedTerms: ["Sales Qualified Lead", "Lead Scoring"],
    },
    {
      id: 5,
      name: "Sales Qualified Lead (SQL)",
      team: "Sales",
      definition:
        "A prospect that has been researched and vetted by the sales team, meeting specific criteria that align with the ideal customer profile.",
      relatedTerms: ["Marketing Qualified Lead", "Opportunity"],
    },
  ],

  // Metric mappings across departments for the visualizer
  metricMappings: [
    {
      id: 1,
      sales: {
        term: "Conversion Rate",
        definition: "% of qualified leads that become customers",
      },
      marketing: {
        term: "Conversion Rate",
        definition: "% of visitors who complete a desired action",
      },
      product: {
        term: "Conversion Rate",
        definition: "% of free trial users who convert to paid",
      },
      data: {
        term: "Conversion Rate",
        definition: "% change from one state to another in a funnel",
      },
      alignmentStatus: "Misaligned",
    },
    {
      id: 2,
      sales: {
        term: "Customer Onboarding",
        definition: "Process of setting up new customers",
      },
      marketing: {
        term: "User Acquisition",
        definition: "Process of gaining new users",
      },
      product: {
        term: "Activation",
        definition: "User experiencing core product value",
      },
      data: {
        term: "First Value Delivery",
        definition: "First meaningful interaction with product",
      },
      alignmentStatus: "Partially Aligned",
    },
    {
      id: 3,
      sales: {
        term: "Revenue",
        definition: "Total sales income",
      },
      marketing: {
        term: "Revenue Attribution",
        definition: "Revenue attributed to marketing efforts",
      },
      product: {
        term: "Revenue per User",
        definition: "Average revenue generated per user",
      },
      data: {
        term: "Revenue",
        definition: "Total income from all sources",
      },
      alignmentStatus: "Aligned",
    },
  ],
}
