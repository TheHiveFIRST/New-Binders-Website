// ============================================================
//  9449 YELLOWJACKETS — TECH BINDER DATA
//  Season: 2026 · Robot: HONEYCOMB
// ============================================================

const binderData = {

  team: {
    number: "9449",
    name: "Yellowjackets",
    season: "2026",
    robot: "HONEYCOMB",
    tagline: "FIRST Rebuilt.",
    location: "Calgary, Alberta",
    logo: "",
  },

  // ── HARDWARE ─────────────────────────────────────────────

  hardware: [
    {
      id: "robot-overview",
      name: "Our 2026 Robot",
      number: "01",
      images: ["images/hardware/robot-overview.png"],
      description: "Honeycomb is built around three core goals identified in game analysis: winning autonomous, carrying large ball capacity, and maintaining high throughput at the shooter. The robot features a swerve drivetrain, an over-the-bumper intake, a large extendable hopper, and a fixed dual-drum shooter.",
      specs: [
        { label: "Season",        value: "FIRST Rebuilt 2026" },
        { label: "Drive",         value: "Swerve (Max Swerve)" },
        { label: "Frame",         value: "26\" × 26\"" },
        { label: "Key Subsystems", value: "Intake, Hopper, Shooter" },
      ],
      features: [
        "Winning autonomous — hopper preloaded before first hub cycle",
        "Large hopper capacity minimizes trips to intake station",
        "High-throughput shooter minimizes cycle time",
        "No turret — fixed shooter reduces complexity and motor count",
        "Avoids under-trench to protect swerve odometry and wheels",
      ]
    },
    {
      id: "drivetrain",
      name: "Drivetrain",
      number: "02",
      images: ["images/hardware/drivetrain.png"],
      description: "Honeycomb's swerve drivetrain allows quick maneuvering around obstacles. Built on a brainpan-style frame for easy electronics access and a lower centre of gravity, with miter rails for fast bumper swapping.",
      specs: [
        { label: "Frame",         value: "26\" × 26\" aluminium boxtube" },
        { label: "Modules",       value: "4× Max Swerve" },
        { label: "Wheels",        value: "Spiky TPU — grips carpet" },
        { label: "Bumpers",       value: "Miter-rail fast-swap system" },
        { label: "Bellypan",      value: "Upper & lower, brainpan style" },
        { label: "Clearance",     value: "Extra height for bump traversal" },
      ],
      features: [
        "26\" × 26\" aluminium boxtube outer frame",
        "4 Max Swerve modules with spiky TPU wheels for carpet grip",
        "Miter rails allow fast bumper swapping between matches",
        "Brainpan-style layout gives easy access to electronics",
        "Upper and lower bellypan with extra bump clearance",
        "Minimum-size bumpers to stay within frame perimeter",
      ]
    },
    {
      id: "intake",
      name: "Intake",
      number: "03",
      images: [
        "images/hardware/intake-v1.png",
      ],
      description: "After three design iterations across competitions, the final World Championship intake uses a NEO VORTEX motor, redesigned geometry, crash bars, and polycarbonate side plates. The pivot mechanism deploys over the bumper, with an automatic retraction when crossing the bump.",
      specs: [
        { label: "Motor",         value: "NEO VORTEX" },
        { label: "Deploy",        value: "Pivot mechanism" },
        { label: "Side Plates",   value: "Polycarbonate" },
        { label: "Protection",    value: "Crash bars" },
        { label: "Bump Mode",     value: "Auto-retract on bump" },
      ],
      features: [
        "NEO VORTEX motor allows intaking even when hopper is mostly full",
        "Redesigned geometry eliminates idle ball zones from V2",
        "Crash bars and polycarbonate plates strengthen common impact points",
        "Rollers are quick-swap for easy pit repairs",
        "Automatic bump-intake mode retracts arm to avoid clipping",
      ]
    },
    {
      id: "hopper",
      name: "Hopper",
      number: "04",
      images: [
        "images/hardware/hopper-final.png",
      ],
      description: "The large hopper allows Honeycomb to carry many balls at once, reducing required cycles to the intake. The final version uses an angled flat floor instead of a belt floor, eliminating the most common failure point while maintaining similar throughput via gravity.",
      specs: [
        { label: "Floor Type",    value: "Angled flat (gravity-fed)" },
        { label: "Side Panels",   value: "Honeycomb-cut aluminium" },
        { label: "Agitation",     value: "Intake pivots up/down" },
        { label: "Prior Floor",   value: "Belt (removed in V2)" },
      ],
      features: [
        "Angled floor uses gravity to guide balls to kicker — no belt needed",
        "Removing belt floor eliminated the most common field failure point",
        "Throughput similar to belt version; reliability significantly higher",
        "Intake pivots up and down during shooting to agitate balls into kicker",
        "Honeycomb-pattern side panels reduce weight while maintaining rigidity",
      ]
    },
    {
      id: "shooter",
      name: "Shooter & Kicker",
      number: "05",
      images: [
        "images/hardware/shooter-v1.png",
      ],
      description: "The final World Championship shooter is a fixed dual-width drum design with 6×3 inch ThriftyBot flywheels, no divider, and dual kicker motors on 3:1 gearboxes. This configuration maximises throughput and eliminates the jamming that plagued the V1 design.",
      specs: [
        { label: "Type",          value: "Fixed dual-drum" },
        { label: "Flywheels",     value: "6× 3 in ThriftyBot (weighted)" },
        { label: "Kicker Motors", value: "2× NEO, 3:1 gearbox" },
        { label: "Transfer",      value: "No divider, no ball path" },
        { label: "Power Control", value: "Linear equation (distance-based)" },
      ],
      features: [
        "Weighted 3 in ThriftyBot flywheels add inertia to overcome motor bog",
        "Divider removed — eliminates jams and increases ball movement freedom",
        "Dual kicker motors on 3:1 gearboxes for consistent high throughput",
        "Power auto-adjusted by linear equation based on distance from hub",
        "Custom PIDF strong enough to maintain speed under ball load",
      ]
    },
  ],

  // ── SOFTWARE ─────────────────────────────────────────────

  software: [
    {
      id: "intake-subsystem",
      name: "Intake Subsystem",
      number: "01",
      images: ["images/hardware/robot-side.png"],
      description: "The intake subsystem handles both ball pickup and agitation during shooting. When intaking, the arm pivots down and spins the NEO VORTEX. An automatic bump-intaking mode retracts the arm as the robot crosses the bump so nothing clips.",
      specs: [
        { label: "Agitation",     value: "Intake pivots up & down" },
        { label: "Intaking",      value: "Arm down + VORTEX spin" },
        { label: "Bump Mode",     value: "Auto-retract on bump detection" },
      ],
      features: [
        "Agitation: intake pivots slightly up and down so balls flow into kicker",
        "When intaking, arm deploys down and VORTEX spins at full speed",
        "Automatic bump-intaking mode retracts arm before crossing bump",
        "Agitation runs concurrently with shooting to increase throughput",
      ]
    },
    {
      id: "shooter-subsystem",
      name: "Shooter Subsystem",
      number: "02",
      images: ["images/software/Drum_Shooter_Assembly__2_.png"],
      description: "The shooter subsystem automatically adjusts motor power based on distance from the hub, using a linear equation calibrated from real shot data. A custom PIDF loop maintains flywheel speed even under motor bog from high ball throughput.",
      specs: [
        { label: "Power Model",   value: "Linear equation (distance)" },
        { label: "Speed Range",   value: "~3000 – 6000 RPM" },
        { label: "Control",       value: "Custom PIDF loop" },
      ],
      features: [
        "Distance-based power: RPM = linear equation of hub distance",
        "Shot data from 6 distances used to fit the linear model",
        "Custom PIDF strong enough to maintain RPM through motor bog",
        "Flywheel speed is held between shots to reduce spin-up time",
      ]
    },
    {
      id: "aiming",
      name: "Aiming Subsystem",
      number: "03",
      images: ["images/software/aiming.jpg"],
      description: "The aiming subsystem uses LimeLight 3 positional data fed into a trigonometric auto-aim function. Given the robot's Pose2D, it calculates X and Y error and uses arctan²(y, x) to determine the required heading angle, then feeds that into a custom PID loop.",
      specs: [
        { label: "Sensor",        value: "LimeLight 3" },
        { label: "Algorithm",     value: "arctan²(y, x) heading calc" },
        { label: "Control",       value: "Custom PID loop" },
        { label: "Input",         value: "Pose2D (x, y, θ)" },
      ],
      features: [
        "LimeLight 3 provides accurate field position mid-match",
        "Pose2D fed into arctan²(y, x) to calculate angle to hub",
        "Handles swerve odometry drift caused by bump air-time",
        "Same positional data feeds into autonomous for collision recovery",
        "Robot can auto-aim from anywhere on the field without driver input",
      ]
    },
    {
      id: "autonomous",
      name: "Autonomous",
      number: "04",
      images: ["images/software/autonomous.jpg"],
      description: "PathPlanner-based autonomous routines with LimeLight relocalization. Honeycomb runs 4 autonomous paths: two double swipes (one each side of the hub), a preload shot, and a follower bump autonomous on the human player side.",
      specs: [
        { label: "Path Tool",     value: "PathPlanner" },
        { label: "Routines",      value: "4 pre-loaded" },
        { label: "Relocalization", value: "LimeLight 3 mid-path" },
        { label: "Prior System",  value: "Time-based (replaced)" },
      ],
      features: [
        "PathPlanner replaces last year's time-based autonomous system",
        "4 autonomous routines: 2 double swipes, preload shot, follower bump",
        "Double swipe paths shoot from near the trench — reduces drive time",
        "LimeLight relocalization corrects odometry drift after bump crossing",
        "Follower bump auto makes a wider intake path then crosses bump to shoot",
      ]
    },
    {
      id: "organization",
      name: "Organization",
      number: "05",
      images: ["images/software/organization.png"],
      description: "The programming team uses GitHub Kanban to plan, assign, and track all tasks in real-time. Kanban cards include time estimates, step-by-step instructions for complex tasks, and assignee tracking — enabling cohesive team coordination throughout build season.",
      specs: [
        { label: "Tool",          value: "GitHub Projects (Kanban)" },
        { label: "Columns",       value: "Ready → In Progress → Review → Done" },
        { label: "Features",      value: "Time estimates, sub-issues, assignees" },
      ],
      features: [
        "GitHub Kanban tracks all tasks with time estimates and assignees",
        "Step-by-step sub-issues break down complex programming tasks",
        "Feedback from the full team feeds into time estimate accuracy",
        "Linked to GitHub Issues for traceability from task to commit",
        "Teaches real-world project management and team coordination skills",
      ]
    },
  ],

  // ── PROTOTYPES ───────────────────────────────────────────

  prototypes: [
    {
      id: "intake-v1",
      name: "Intake V1 — Canadian Pacific",
      number: "01",
      images: ["images/hardware/intake-v1.png"],
      description: "First intake design, debuted at Canadian Pacific. Used 3 sets of 2 inch ThriftyBot squish wheels, a curved HDPE ramp to maintain compression, and a pivot deploy mechanism.",
      outcome: "Rejected",
      outcomeNote: "Wheels lacked compression and grip; ramp bent under load; intake collided with hopper on deploy.",
      features: [
        "3 sets of 2 in ThriftyBot squish wheels on pivot deploy arm",
        "Curved ramp maintains compression through intake path",
        "Panels manufactured from ⅜\" HDPE",
        "Flaw: wheels insufficient compression/grip for balls at speed",
        "Flaw: ramp bent — lacked structural support",
        "Flaw: intake collided with hopper, hindering deployment",
      ]
    },
    {
      id: "intake-v2",
      name: "Intake V2 — Idaho",
      number: "02",
      images: ["images/hardware/intake-v2.png"],
      description: "Idaho regional update. Swapped front squish wheels for grip-tape rollers, added star wheels to the second shaft, and tensioned the intake arm to prevent hopper collision.",
      outcome: "Iterated",
      outcomeNote: "Solved grip and collision issues. Idle ball zones inside intake discovered — addressed in V3.",
      features: [
        "Front wheels replaced with grip-tape rollers — increased compression",
        "Star wheels added to second shaft for stronger ball engagement",
        "Intake tensioned to stop collision with hopper panels",
        "Added structural supports to stop ramp warping",
        "Remaining flaw: balls could sit idle in certain intake positions",
      ]
    },
    {
      id: "intake-v3",
      name: "Intake V3 — World Championship",
      number: "03",
      images: ["images/software/Main_Assembly__12_.png"],
      description: "Final intake for Worlds. NEO VORTEX motor, fully redesigned geometry, crash bars at impact points, and polycarbonate side plates. Rollers are quick-swap for easy pit repair.",
      outcome: "Adopted",
      outcomeNote: "Stronger motor, no idle ball zones, reinforced structure, and fast field repairs. This is the final design.",
      features: [
        "Swapped NEO for NEO VORTEX — continues intaking when hopper is full",
        "New geometry eliminates idle-ball zones from V2",
        "Crash bars on common impact points limit match damage",
        "Polycarbonate side plates improve durability over HDPE",
        "Quick-swap rollers allow fast repairs without tools",
      ]
    },
    {
      id: "hopper-v1",
      name: "Hopper V1 — Pre-Competition",
      number: "04",
      images: ["images/hardware/hopper-v1.png"],
      description: "Initial hopper design with 25 parallel belt floor belts and an extendable rear section. Built for maximum ball capacity before regional season.",
      outcome: "Rejected",
      outcomeNote: "Belt floor constantly slipped off pulleys, provided poor traction, and the extendable section caught on the intake.",
      features: [
        "25 belts along the hopper floor for ball movement",
        "Extendable rear section for additional capacity",
        "Honeycomb-pattern aluminium side panels",
        "Flaw: belts came off pulleys frequently",
        "Flaw: belt traction too low to move balls reliably",
        "Flaw: extendable section caught on intake during cycling",
      ]
    },
    {
      id: "hopper-v2",
      name: "Hopper V2 — Post-Competition",
      number: "05",
      images: ["images/hardware/hopper-final.png"],
      description: "Belt floor fully removed and replaced with an angled flat floor that uses gravity to guide balls. Extendable section removed to eliminate intake collision.",
      outcome: "Adopted",
      outcomeNote: "Removing the belt eliminated the top failure mode. Gravity feed maintained similar throughput with zero belt failures.",
      features: [
        "Belt floor removed entirely — eliminates primary failure point",
        "Angled flat floor guides balls via gravity with similar throughput",
        "Extendable rear section removed — no more intake collision",
        "Simpler construction reduces weight and build time",
        "Intake agitation (pivot up/down) compensates for reduced floor drive",
      ]
    },
    {
      id: "shooter-v1",
      name: "Shooter V1 — Canadian Pacific",
      number: "06",
      images: ["images/hardware/shooter-v1.png"],
      description: "First shooter design: a 2-lane dual flywheel with a divider, 2 ungeared NEO flywheels, a 5:1 NEO kicker, and 3 in ThriftyBot weighted wheels. Debuted at Canadian Pacific.",
      outcome: "Iterated",
      outcomeNote: "Divider slowed throughput; lack of flywheel weight caused motor bog under load. Required heavier wheels and removal of divider.",
      features: [
        "2-lane design with central divider for ball separation",
        "2 ungeared REV NEOs spinning 3 in ThriftyBot flywheels",
        "5:1 NEO gearbox driving kicker",
        "3 in squish wheels and 3D-printed vector wheels for transfer",
        "Flaw: divider restricted ball movement, reducing throughput",
        "Flaw: light flywheels had insufficient inertia — motor bog under load",
      ]
    },
    {
      id: "shooter-v2",
      name: "Shooter V2 — Idaho & Worlds",
      number: "07",
      images: ["images/software/Drum_Shooter_Assembly__2_.png"],
      description: "Idaho and Worlds update. Added 6×3 inch weighted ThriftyBot flywheels, removed divider and ball path, added a second kicker motor, and switched kicker gearboxes to 3:1.",
      outcome: "Adopted",
      outcomeNote: "Higher inertia eliminated motor bog, divider removal reduced jams, dual kickers increased consistency. Final design for Worlds.",
      features: [
        "6× 3 in ThriftyBot weighted flywheels — adds inertia to beat motor bog",
        "Divider removed — balls move freely, less jamming",
        "Ball path removed — accommodates inconsistent ball entry angles",
        "Second kicker motor added for consistent, higher throughput",
        "Kicker gearboxes changed to 3:1 for better torque and speed",
      ]
    },
  ],
};
