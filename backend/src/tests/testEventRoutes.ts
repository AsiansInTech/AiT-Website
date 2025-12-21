//npx ts-node src/tests/testEventRoutes.ts

import { mockEventRepository } from './mockEventRepository';
import { Event, CreateEventDto, UpdateEventDto } from '../types/content';

// ANSI color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg: string) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  header: (msg: string) => console.log(`\n${colors.bold}${colors.cyan}═══ ${msg} ═══${colors.reset}\n`),
  subheader: (msg: string) => console.log(`${colors.yellow}▶ ${msg}${colors.reset}`),
  data: (label: string, data: any) => console.log(`  ${colors.cyan}${label}:${colors.reset}`, JSON.stringify(data, null, 2)),
};

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

async function runTest(testName: string, testFn: () => Promise<void>): Promise<void> {
  try {
    await testFn();
    results.push({ name: testName, passed: true });
    log.success(testName);
  } catch (error: any) {
    results.push({ name: testName, passed: false, error: error.message });
    log.error(`${testName}: ${error.message}`);
  }
}

// ==================== TEST CASES ====================

async function testGetAllEvents(): Promise<void> {
  log.header('TEST 1: GET /api/events - Get All Events');

  await runTest('Should return an array of events', async () => {
    const events = await mockEventRepository.getAll();
    assert(Array.isArray(events), 'Response should be an array');
    assert(events.length > 0, 'Should have at least one event');
    log.data('Total events returned', events.length);
  });

  await runTest('Events should have correct structure for frontend', async () => {
    const events = await mockEventRepository.getAll();
    const event = events[0];

    assert(typeof event.id === 'string', 'Event should have string id');
    assert(typeof event.name === 'string', 'Event should have string name');
    assert(typeof event.date === 'string', 'Event should have string date');
    assert(typeof event.status === 'string', 'Event should have string status');
    assert(Array.isArray(event.attendees), 'Event should have attendees array');

    log.data('Sample event structure', {
      id: event.id,
      name: event.name,
      date: event.date,
      status: event.status,
      attendeesCount: event.attendees.length,
    });
  });

  await runTest('Events should be sorted by date (ascending)', async () => {
    const events = await mockEventRepository.getAll();
    for (let i = 1; i < events.length; i++) {
      const prevDate = new Date(events[i - 1].date).getTime();
      const currDate = new Date(events[i].date).getTime();
      assert(currDate >= prevDate, `Events should be sorted by date`);
    }
    log.info('Events are correctly sorted by date');
  });

  await runTest('Events should include all status types', async () => {
    const events = await mockEventRepository.getAll();
    const statuses = [...new Set(events.map((e) => e.status))];
    log.data('Available statuses', statuses);
    assert(statuses.includes('confirmed'), 'Should have confirmed events');
    assert(statuses.includes('planned'), 'Should have planned events');
  });
}

async function testGetEventById(): Promise<void> {
  log.header('TEST 2: GET /api/events/:id - Get Event by ID');

  await runTest('Should return a single event by valid ID', async () => {
    const event = await mockEventRepository.getById('evt-001');
    assert(event !== null, 'Event should exist');
    assert(event!.id === 'evt-001', 'Should return correct event');
    assert(event!.name === 'AiT Welcome Week Kickoff', 'Should have correct name');

    log.data('Retrieved event', {
      id: event!.id,
      name: event!.name,
      location: event!.location,
      attendees: event!.attendees,
    });
  });

  await runTest('Should return null for non-existent ID', async () => {
    const event = await mockEventRepository.getById('non-existent-id');
    assert(event === null, 'Should return null for invalid ID');
    log.info('Correctly returned null for non-existent event');
  });

  await runTest('Event should have all required fields for frontend display', async () => {
    const event = await mockEventRepository.getById('evt-003');
    assert(event !== null, 'Event should exist');

    // Check all fields frontend might need
    const requiredFields = ['id', 'name', 'date', 'status', 'attendees'];
    const optionalFields = ['endDate', 'location', 'description', 'createdAt', 'updatedAt'];

    for (const field of requiredFields) {
      assert(event![field as keyof Event] !== undefined, `Should have ${field}`);
    }

    log.data('Event with all fields', event);
  });
}

async function testCreateEvent(): Promise<void> {
  log.header('TEST 3: POST /api/events - Create New Event');

  await runTest('Should create a new event with required fields only', async () => {
    const newEventData: CreateEventDto = {
      name: 'Tech Talk: Cloud Computing',
      date: '2025-04-10',
    };

    const createdEvent = await mockEventRepository.create(newEventData);

    assert(createdEvent.id !== undefined, 'Should have generated ID');
    assert(createdEvent.name === newEventData.name, 'Should have correct name');
    assert(createdEvent.date === newEventData.date, 'Should have correct date');
    assert(createdEvent.status === 'planned', 'Should default to planned status');
    assert(Array.isArray(createdEvent.attendees), 'Should have empty attendees array');

    log.data('Created event (minimal)', createdEvent);
  });

  await runTest('Should create a new event with all fields', async () => {
    const newEventData: CreateEventDto = {
      name: 'Full Stack Workshop',
      date: '2025-05-01',
      endDate: '2025-05-02',
      location: 'Engineering Building 301',
      description: 'Learn full stack development with React and Node.js',
      status: 'confirmed',
      attendees: ['Student A', 'Student B'],
    };

    const createdEvent = await mockEventRepository.create(newEventData);

    assert(createdEvent.name === newEventData.name, 'Name should match');
    assert(createdEvent.date === newEventData.date, 'Start date should match');
    assert(createdEvent.endDate === newEventData.endDate, 'End date should match');
    assert(createdEvent.location === newEventData.location, 'Location should match');
    assert(createdEvent.description === newEventData.description, 'Description should match');
    assert(createdEvent.status === newEventData.status, 'Status should match');
    assert(createdEvent.attendees.length === 2, 'Should have 2 attendees');
    assert(createdEvent.createdAt !== undefined, 'Should have createdAt timestamp');
    assert(createdEvent.updatedAt !== undefined, 'Should have updatedAt timestamp');

    log.data('Created event (full)', createdEvent);
  });

  await runTest('Created event should be retrievable', async () => {
    const events = await mockEventRepository.getAll();
    const techTalkEvent = events.find((e) => e.name === 'Tech Talk: Cloud Computing');
    assert(techTalkEvent !== undefined, 'Created event should be in the list');
    log.info('Created event is persisted and retrievable');
  });
}

async function testUpdateEvent(): Promise<void> {
  log.header('TEST 4: PUT /api/events/:id - Update Event');

  await runTest('Should update event name', async () => {
    const updateData: UpdateEventDto = {
      name: 'AiT Welcome Week Kickoff - UPDATED',
    };

    const updatedEvent = await mockEventRepository.update('evt-001', updateData);

    assert(updatedEvent.id === 'evt-001', 'ID should remain unchanged');
    assert(updatedEvent.name === updateData.name, 'Name should be updated');
    assert(updatedEvent.location !== undefined, 'Other fields should be preserved');

    log.data('Updated event (name only)', { id: updatedEvent.id, name: updatedEvent.name });
  });

  await runTest('Should update multiple fields', async () => {
    const updateData: UpdateEventDto = {
      location: 'New Location - Main Hall',
      status: 'cancelled',
      attendees: ['New Attendee 1', 'New Attendee 2', 'New Attendee 3'],
    };

    const updatedEvent = await mockEventRepository.update('evt-002', updateData);

    assert(updatedEvent.location === updateData.location, 'Location should be updated');
    assert(updatedEvent.status === updateData.status, 'Status should be updated');
    assert(updatedEvent.attendees.length === 3, 'Attendees should be updated');
    assert(updatedEvent.name === 'AI/ML Workshop Series - Part 1', 'Unchanged fields preserved');

    log.data('Updated event (multiple fields)', {
      id: updatedEvent.id,
      location: updatedEvent.location,
      status: updatedEvent.status,
      attendees: updatedEvent.attendees,
    });
  });

  await runTest('Should throw error for non-existent event', async () => {
    try {
      await mockEventRepository.update('non-existent-id', { name: 'Test' });
      assert(false, 'Should have thrown an error');
    } catch (error: any) {
      assert(error.message === 'Event not found', 'Should throw Event not found error');
      log.info('Correctly threw error for non-existent event');
    }
  });

  await runTest('Updated event should have new updatedAt timestamp', async () => {
    const beforeUpdate = await mockEventRepository.getById('evt-003');
    const originalUpdatedAt = beforeUpdate!.updatedAt;

    // Small delay to ensure timestamp difference
    await new Promise((resolve) => setTimeout(resolve, 10));

    const updatedEvent = await mockEventRepository.update('evt-003', {
      description: 'Updated description for timestamp test',
    });

    assert(updatedEvent.updatedAt !== originalUpdatedAt, 'updatedAt should change');
    log.data('Timestamp comparison', {
      before: originalUpdatedAt,
      after: updatedEvent.updatedAt,
    });
  });
}

async function testDeleteEvent(): Promise<void> {
  log.header('TEST 5: DELETE /api/events/:id - Delete Event');

  await runTest('Should delete an existing event', async () => {
    const eventsBefore = await mockEventRepository.getAll();
    const countBefore = eventsBefore.length;

    await mockEventRepository.delete('evt-005');

    const eventsAfter = await mockEventRepository.getAll();
    const countAfter = eventsAfter.length;

    assert(countAfter === countBefore - 1, 'Event count should decrease by 1');
    log.data('Event counts', { before: countBefore, after: countAfter });
  });

  await runTest('Deleted event should not be retrievable', async () => {
    const deletedEvent = await mockEventRepository.getById('evt-005');
    assert(deletedEvent === null, 'Deleted event should not exist');
    log.info('Deleted event is no longer retrievable');
  });

  await runTest('Should throw error when deleting non-existent event', async () => {
    try {
      await mockEventRepository.delete('non-existent-id');
      assert(false, 'Should have thrown an error');
    } catch (error: any) {
      assert(error.message === 'Event not found', 'Should throw Event not found error');
      log.info('Correctly threw error for non-existent event');
    }
  });
}

async function testFrontendDataFormat(): Promise<void> {
  log.header('BONUS: Frontend Data Format Validation');

  await runTest('Events should be ready for calendar display', async () => {
    const events = await mockEventRepository.getAll();

    const calendarReadyEvents = events.map((e) => ({
      id: e.id,
      title: e.name,
      start: e.date,
      end: e.endDate || e.date,
      status: e.status,
      color: e.status === 'confirmed' ? 'green' : e.status === 'cancelled' ? 'red' : 'blue',
    }));

    log.data('Calendar-ready events sample', calendarReadyEvents.slice(0, 2));
    log.info('Events can be transformed for frontend calendar component');
  });

  await runTest('Events should be ready for list display', async () => {
    const events = await mockEventRepository.getAll();

    const listReadyEvents = events.map((e) => ({
      id: e.id,
      name: e.name,
      date: new Date(e.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      location: e.location || 'TBD',
      attendeeCount: e.attendees.length,
      statusBadge: e.status.charAt(0).toUpperCase() + e.status.slice(1),
    }));

    log.data('List-ready events sample', listReadyEvents.slice(0, 2));
    log.info('Events can be transformed for frontend list component');
  });
}

// ==================== MAIN TEST RUNNER ====================

async function runAllTests(): Promise<void> {
  console.log(`${colors.bold}${colors.cyan}`);
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           EVENT ROUTES TEST SUITE                          ║');
  console.log('║           Testing all 5 CRUD operations                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);

  // Reset test data before running tests
  log.info('Resetting test data to initial state...');
  mockEventRepository.resetTestData();

  try {
    await testGetAllEvents();
    await testGetEventById();
    await testCreateEvent();
    await testUpdateEvent();
    await testDeleteEvent();
    await testFrontendDataFormat();
  } catch (error: any) {
    log.error(`Unexpected error: ${error.message}`);
  }

  // Print summary
  console.log(`\n${colors.bold}${colors.cyan}═══ TEST SUMMARY ═══${colors.reset}\n`);

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`Total:  ${results.length}`);

  if (failed > 0) {
    console.log(`\n${colors.red}${colors.bold}Failed Tests:${colors.reset}`);
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(`  ${colors.red}✗ ${r.name}: ${r.error}${colors.reset}`);
      });
  }

  // Reset test data after tests
  log.info('\nResetting test data to initial state...');
  mockEventRepository.resetTestData();

  console.log(`\n${colors.bold}${passed === results.length ? colors.green : colors.yellow}Tests completed!${colors.reset}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runAllTests();
