// Entity-Relationship Diagram (ERD) - Preliminary for Terra Score (Crowdsourced Sustainability Platform)

{
  "collections"; [
    {
      "name": "productModels",
      "fields": {
        "id": "number",
        "name": "string",
        "description": "string",
        "category": "ref to productCategory", // e.g., raw_material, manufactured_good, animal, company, government
        "productAttributes": "object" // e.g., { weight: '500g', dimensions: '10x5x2cm' }
      }
    },
    {
      "name": "productCategory",
      "fields": {
        "id": "number",
        "name": "string",
        "description": "string"
      }
    },
    {
      "name": "productInstances",
      "fields": {
        "id": "number",
        "productRef": "ref to Product_models",
        "owner": "ref to Users",
        "location": "string", // e.g., country, city
        "status": "string", // e.g., active, stored, broken 
        "customAttributes": "object" // e.g., { color: 'red', size: 'large' }
      }
    },
    {
      "name": "processesModels",
      "fields": {
        "id": "number",
        "name": "string",
        "description": "string",
        "actor": "ref to Products", // who or what is performing the process
        "inputs": "array of refs to Products",
        "outputs": "array of refs to Products",
        "conditions": "array of refs to Conditions",
        "impacts": "array of refs to Impacts"
      }
    },
    {
      "name": "conditions",
      "fields": {
        "id": "number",
        "name": "string",
        "value": "number or string", // e.g., temperature: 300K
        "unit": "string",
        "description": "string",
      }
    },
    {
      "name": "impacts",
      "fields": {
        "id": "number",
        "name": "string",
        "type": "string", // e.g., carbon_emission, habitat_loss
        "value": "number",
        "unit": "string",
        "description": "string",
        "relatedTo": "ref to Processes or Products",
        "source": "string", // external source or user comment
      }
    },
    {
        "name": "media",
        "fields": {
            "id": "number",
            "title": "string",
            "description": "string",
            "type": "string",        // image, video, pdf, doc, raw_data, etc.
            "fileUrl": "string",     // public URL from Firebase Storage
            "storagePath": "string", // internal storage path
            "uploadedBy": "ref to Users",
            "linkedTo": "ref to Products or Processes or ProductInstances or Impacts", 
            "format": "string",      // file extension like 'jpg', 'mp4', 'csv'
            "tags": "array of strings",
            "source": "string",      // e.g., 'fueleconomy.gov'
            "license": "string",     // e.g., Creative Commons, Proprietary
        }
    },
    {
      "name": "users",
      "fields": {
        "id": "number",
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "password": "string",
        "email": "string",
        "role": "string", // admin, moderator, contributor, public
        "credibilityScore": "number",
        "lastEdit": "timestamp",
        "edits": "number",
        "joinedAt": "timestamp"      
        }
    },
    {
      "name": "edits",
      "fields": {
        "id": "number",
        "target": "ref to any other collection",
        "targetKey": "string",
        "oldValue": "ref to edits",
        "newValue": "any",
        "editedBy": "ref to Users",
        "editedAt": "timestamp",
        "approved": "boolean"
      }
    },
    // {
    //   "name": "ratings",
    //   "fields": {
    //     "target": "ref to Products or Processes",
    //     "type": "string", // sustainability, credibility
    //     "score": "number",
    //     "votedBy": "ref to Users",
    //     "createdAt": "timestamp"
    //   }
    // },
    // {
    //   "name": "reviews",
    //   "fields": {
    //     "target": "ref to any other collection",
    //     "targetKey": "string", // e.g., product_id, process_id
    //     "reviewedBy": "ref to Users",
    //     "comments": "string",
    //     "approved": "boolean",
    //     "credibilityAssessment": "string",
    //     "createdAt": "timestamp"
    //   }
    // }
  ]
}
