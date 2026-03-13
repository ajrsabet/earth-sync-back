
module.exports = {
  productModels: [
    {
      name: "Vehicle",
      description: "Generic vehicle product template",
      type: "vehicle",
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Equipment",
      description: "Generic equipment product template",
      type: "equipment",
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  productInstances: [
    {
      productRef: "vehicle-model-id",  // Reference to product model
      uniqueIdentifier: "VIN123456789ABC",  // Serial number, VIN, part number, etc.
      owner: {
        customerId: 1,
        purchaseDate: new Date("2023-01-15"),
        ownershipStatus: "active"
      },
      status: "active",
      customAttributes: {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        color: "blue",
        mileage: 15000,
        purchasePrice: 35000
      },
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productRef: "vehicle-model-id",
      uniqueIdentifier: "VIN987654321XYZ",
      owner: {
        customerId: 2,
        purchaseDate: new Date("2022-06-20"),
        ownershipStatus: "active"
      },
      status: "active",
      customAttributes: {
        make: "Honda",
        model: "Civic",
        year: 2022,
        color: "silver",
        mileage: 25000,
        purchasePrice: 28000
      },
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  processesModels: [
    {
      name: "Engine Oil Change",
      description: "Routine maintenance: oil and filter change",
      actor: 1,  // Technician/shop ID
      inputs: ["instance-id-1"],  // References to product instances
      outputs: [],
      byproducts: [],
      conditions: [],
      impacts: [1],  // Reference to cost/environmental impact
      createdBy: 1,
      createdAt: new Date(),
      metadata: {
        date: new Date("2024-01-10"),
        location: "John's Auto Shop",
        notes: "Regular scheduled maintenance"
      }
    },
    {
      name: "Engine Repair",
      description: "Major engine repair after fault code P0301",
      actor: 1,
      inputs: ["instance-id-1"],
      outputs: [],
      byproducts: [],
      conditions: [],
      impacts: [2],
      createdBy: 1,
      createdAt: new Date(),
      metadata: {
        date: new Date("2024-02-05"),
        location: "Premium Auto Service",
        notes: "Misfire detected, cylinders inspected"
      }
    }
  ],
  conditions: [
    {
      name: "Temperature",
      value: "300K",
      unit: "K",
      description: "Standard service temperature.",
      createdBy: 1,
      createdAt: new Date()
    }
  ],
  impacts: [
    {
      name: "Oil Change Cost",
      type: "maintenance_cost",
      value: 50,
      unit: "USD",
      description: "Cost for oil change service",
      relatedTo: "process-id",
      source: "Service Invoice",
      createdBy: 1,
      createdAt: new Date()
    },
    {
      name: "Engine Repair Cost",
      type: "repair_cost",
      value: 1500,
      unit: "USD",
      description: "Major engine repair costs",
      relatedTo: "process-id",
      source: "Service Invoice",
      createdBy: 1,
      createdAt: new Date()
    }
  ],
  media: [
    {
      title: "Vehicle Service Receipt",
      description: "Receipt from oil change service",
      type: "image",
      fileUrl: "https://example.com/receipt.jpg",
      storagePath: "media/receipts/receipt-001.jpg",
      uploadedBy: 1,
      linkedTo: "process-id",
      format: "jpg",
      tags: ["maintenance", "receipt"],
      source: "manual_upload",
      license: "Private",
      createdAt: new Date()
    }
  ],
  users: [
    {
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      password: "hashedpassword",
      email: "test@example.com",
      role: "contributor",
      credibilityScore: 10,
      lastContribution: new Date(),
      contributions: 1,
      joinedAt: new Date()
    }
  ],
  ratings: [
    {
      target: "instance-id",
      type: "sustainability",
      score: 5,
      votedBy: 1,
      createdAt: new Date()
    }
  ],
  edits: [
    {
      target: "instance-id",
      targetKey: "customAttributes.mileage",
      oldValue: 20000,
      newValue: 25000,
      editedBy: 1,
      editedAt: new Date(),
      approved: true
    }
  ],
  reviews: [
    {
      target: "process-id",
      targetKey: "description",
      reviewedBy: 1,
      comments: "Accurate service record.",
      approved: true,
      credibilityAssessment: "high",
      createdAt: new Date()
    }
  ]
};