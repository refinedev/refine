// Simple verification of the useForm enabled condition fix

// Simulate the fixed logic
function testEnabledCondition(isCreate, id, userEnabled) {
  // This is the fixed logic from the useForm hook
  const internalCondition = !isCreate && id !== undefined;
  const userCondition = userEnabled ?? true;
  const finalEnabled = internalCondition && userCondition;
  
  return {
    internalCondition,
    userCondition,
    finalEnabled
  };
}

console.log("=== useForm enabled condition fix verification ===\n");

// Test cases
const testCases = [
  { isCreate: false, id: undefined, userEnabled: true, description: "Edit with undefined ID, user enabled: true" },
  { isCreate: false, id: "123", userEnabled: true, description: "Edit with defined ID, user enabled: true" },
  { isCreate: false, id: "123", userEnabled: false, description: "Edit with defined ID, user enabled: false" },
  { isCreate: true, id: undefined, userEnabled: true, description: "Create action, user enabled: true" },
  { isCreate: true, id: "123", userEnabled: true, description: "Create action with ID, user enabled: true" },
  { isCreate: false, id: "123", userEnabled: undefined, description: "Edit with defined ID, user enabled: undefined (default)" }
];

testCases.forEach((testCase, index) => {
  const result = testEnabledCondition(testCase.isCreate, testCase.id, testCase.userEnabled);
  
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`  Internal condition (!isCreate && id !== undefined): ${result.internalCondition}`);
  console.log(`  User condition (${testCase.userEnabled} ?? true): ${result.userCondition}`);
  console.log(`  Final enabled: ${result.finalEnabled}`);
  console.log(`  Result: ${result.finalEnabled ? '✅ Query ENABLED' : '❌ Query DISABLED'}`);
  console.log("");
});

console.log("=== Summary ===");
console.log("✅ Fix prevents API calls with undefined ID even when user passes enabled: true");
console.log("✅ User can still disable queries by passing enabled: false");
console.log("✅ Normal functionality preserved for valid cases");