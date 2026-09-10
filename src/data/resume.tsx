import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Briefcase, FolderGit2 } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Pradeep S",
  initials: "PS",
  url: "https://github.com/Pradeepz01",
  location: "Chennai, India",
  locationLink: "https://www.google.com/maps/place/Chennai",
  description:
    "ECE (Major) & CSE (Minor) @ CEG’27, Anna University, Chennai. Embedded Systems, Firmware & RTL Design Engineer.",
  summary:
    "ECE undergraduate at College of Engineering, Guindy (Anna University, Chennai) with hands-on experience in Embedded C, bare-metal firmware development, and peripheral driver design across UART, SPI, I²C, timers, and interrupts. Experienced in microcontroller-based system design, motion-control firmware, and RTL design through academic projects and internships.",
  avatarUrl: "/portfolio_pradeep.jpg",
  skills: [
    { name: "C" },
    { name: "Embedded C" },
    { name: "C++", icon: Csharp },
    { name: "Python", icon: Python },
    { name: "ARM Cortex-M4 (STM32F446RE)" },
    { name: "PIC16F877A" },
    { name: "Bare-Metal Programming" },
    { name: "Peripheral Driver Development" },
    { name: "UART" },
    { name: "SPI" },
    { name: "I²C" },
    { name: "Timers & Interrupts" },
    { name: "FSM (State Machines)" },
    { name: "Arduino & ESP" },
    { name: "Marlin Firmware" },
    { name: "Verilog" },
    { name: "RTL Design" },
    { name: "RISC-V (RV32I)" },
    { name: "AXI Protocol" },
    { name: "Sky130 (Tiny Tapeout)" },
    { name: "STM32CubeIDE" },
    { name: "MPLAB X IDE" },
    { name: "Vivado" },
    { name: "ModelSim" },
    { name: "GTKWave & Quartus" },
    { name: "EasyEDA" },
    { name: "GNU Radio" },
    { name: "PICSimLab" },
    { name: "MATLAB" },
    { name: "Linux" },
    { name: "Git" },
    { name: "VS Code" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/experience", icon: Briefcase, label: "Experience" },
    { href: "/#projects", icon: FolderGit2, label: "Projects" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "pradeepsaravana01@gmail.com",
    tel: "+91 9342782799",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Pradeepz01",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/pradeep-s06/",
        icon: Icons.linkedin,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/saltlee/",
        icon: Icons.leetcode,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:pradeepsaravana01@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Embedded Systems Intern – Emertxe Information Technologies",
      href: "https://github.com/Pradeepz01/EMERTXE_INTERNSHIP",
      badges: ["Internship"],
      location: "Virtual / Remote",
      title: "Embedded Systems Intern",
      logoUrl: "/emertxe.png",
      start: "Dec 2025",
      end: "Jan 2026",
      description:
        "Developed production-quality Embedded C firmware on the 8-bit PIC16F877A microcontroller utilizing low-level bit manipulation, hardware timer configuration, interrupt-driven service routines (ISRs), and modular peripheral driver abstraction.\n\nEngineered a complete Microwave Oven Controller system simulation in PICSimLab featuring a robust Finite State Machine (FSM) architecture controlling operational states (Micro, Grill, Convection, Start/Pause), Matrix Keypad polling, character LCD menu interfacing, and safety timer management.",
    },
    {
      company: "Wireless Transceiver Design Intern — CWISD, Anna University",
      href: "https://github.com/Pradeepz01/Digital-Adaptive-Reconstruction-and-Transmission",
      badges: ["Internship"],
      location: "Chennai, India",
      title: "Wireless Transceiver Design Intern",
      logoUrl: "/anna_univ.png",
      start: "Jun 2025",
      end: "Jun 2025",
      description:
        "Implemented digital modulation and demodulation pipelines including ASK, PSK, QAM, and OFDM using GNU Radio with realistic signal generation, channel distortion modeling (AWGN and multipath fading), and constellation/BER performance evaluation.\n\nDesigned digital filter blocks (FIR/IIR) and signal flow graphs while gaining deep hands-on exposure to baseband signal processing algorithms, software-defined radio (SDR) paradigms, and modern wireless transceiver RF front-end architectures.",
    },
  ],
  education: [
    {
      school: "College of Engineering, Guindy (CEG), Anna University, Chennai",
      href: "https://ceg.annauniv.edu",
      degree:
        "B.E. in Electronics and Communication Engineering (Major) & Minor in Computer Science (Cybersecurity) | CGPA: 7.99",
      logoUrl: "/ceg_logo.png",
      start: "2023",
      end: "2027",
    },
    {
      school: "SPK Gems Schools",
      href: "#",
      degree: "Higher Secondary Education (HSC) | Aggregate: 96.5%",
      logoUrl: "",
      start: "2021",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "Secure Bootloader and OTA Firmware Update Framework",
      href: "https://github.com/Pradeepz01/SecureBootLoader-OTA",
      dates: "Jul 2026 – Present",
      active: true,
      description:
        "Developing a custom bootloader on STM32F446RE with packet-based UART communication and Flash memory management, supporting Flash erase and data programming. Extending the bootloader toward secure OTA firmware updates with firmware validation, application/bootloader separation, rollback protection, and integrity verification.",
      technologies: [
        "Embedded C",
        "ARM Cortex-M4",
        "STM32F446RE",
        "Custom Bootloader",
        "OTA",
        "UART Protocol",
        "Flash Memory",
        "FSM",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Pradeepz01/SecureBootLoader-OTA",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/stm32.jpg",
      video: "",
    },
    {
      title: "True Random Number Generator (TRNG) – Sky130 ASIC",
      href: "https://github.com/Pradeepz01/TRNG",
      dates: "May 2026",
      active: true,
      description:
        "Designed a True Random Number Generator leveraging jitter and thermal noise in free-running ring oscillators for cryptographic applications. Modeled in Verilog and synthesized using the open-source Sky130 PDK on Tiny Tapeout.",
      technologies: [
        "Verilog",
        "Tiny Tapeout",
        "Sky130",
        "ASIC",
        "Vivado",
        "Hardware Security",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Pradeepz01/TRNG",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/tinytapeout_card.png",
      video: "",
    },
    {
      title: "RISC-V Data Memory AXI IP",
      href: "https://github.com/Pradeepz01/CEG_FABLESS_RISCV-DATA-MEMORY",
      dates: "Jan 2026",
      active: true,
      description:
        "Designed an RV32I data-memory block supporting load/store operations, byte/halfword access, address decoding, and sign/zero extension for the CEG FABLESS DEV team. Integrated the memory as an AXI-compliant IP and verified functionality through RTL simulation and waveform analysis using Vivado.",
      technologies: [
        "Verilog",
        "RISC-V",
        "RV32I",
        "AXI Protocol",
        "Vivado",
        "ModelSim",
        "RTL Simulation",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Pradeepz01/CEG_FABLESS_RISCV-DATA-MEMORY",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/riscv_card.svg",
      video: "",
    },
    {
      title: "Hybrid 3D Printer (SLA + FDM)",
      href: "https://github.com/Pradeepz01/Marlin_Hybrid3DPrinter",
      dates: "Dec 2024 – Jan 2025",
      active: true,
      description:
        "Led electronics integration including motor drivers, sensor interfacing, power distribution, and hardware debugging for a hybrid SLA + FDM 3D printer. Customized Marlin firmware and implemented G-code based control logic for synchronized resin extrusion, UV curing, and motion control.",
      technologies: [
        "Embedded C",
        "Marlin Firmware",
        "G-Code",
        "Hardware Integration",
        "Motion Control",
        "SLA + FDM",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Pradeepz01/Marlin_Hybrid3DPrinter",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Certificate",
          href: "/certifications/Hybrid3DPrinter_P&R_Pradeep_S_LOA.pdf",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/hybrid_3dprinter_1.jpg",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Mastering Microcontroller and Embedded Driver Development",
      dates: "FastBit Academy (Udemy)",
      location: "ARM Cortex-M4 Bare-Metal Development",
      description:
        "In-depth bare-metal driver development from scratch for ARM Cortex-M4 (STM32F4) peripherals: GPIO, I2C, SPI, USART, NVIC, RCC, timers, and interrupt handling.",
      image: "/udemy_logo.svg",
      links: [
        {
          title: "View Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://ude.my/UC-95a53d5c-2075-4d35-8c38-74af728c8908",
        },
      ],
    },
    {
      title: "Fundamentals of Verilog HDL",
      dates: "Udemy",
      location: "Digital Design & RTL Modeling",
      description:
        "Comprehensive training on Verilog hardware description language, behavioral and structural modelling, testbench architecture, simulation, and synthesis.",
      image: "/udemy_logo.svg",
      links: [
        {
          title: "View Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.udemy.com/certificate/UC-646a1979-6c85-492b-a107-de5b13110bc4/",
        },
      ],
    },
    {
      title: "Letter of Appreciation – Hybrid 3D Printer Contribution",
      dates: "CEG Tech Forum (CTF)",
      location: "College of Engineering, Guindy",
      description:
        "Awarded official Letter of Appreciation from CEG Tech Forum (CTF) for leading electronics integration, Marlin firmware customization, UV curing synchronization, and motion control for the hybrid SLA + FDM printer.",
      image: "/ctf_logo.png",
      links: [
        {
          title: "View Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://github.com/Pradeepz01/Certifications/blob/main/Hybrid3DPrinter_P%26R_Pradeep_S_LOA.pdf",
        },
      ],
    },
    {
      title: "Introduction to Internet of Things (IoT)",
      dates: "NPTEL (Elite Certification)",
      location: "IIT Kharagpur / SWAYAM",
      description:
        "Certified in IoT fundamentals, embedded sensor networks, IoT communication protocols (MQTT, CoAP), wireless network topologies, and embedded system integration.",
      image: "/nptel_logo.svg",
      links: [
        {
          title: "View Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://github.com/Pradeepz01/Certifications/blob/main/Introduction%20To%20Internet%20Of%20Things.pdf",
        },
      ],
    },
    {
      title: "Problem Solving in Python",
      dates: "HackerRank",
      location: "Algorithms & Data Structures",
      description:
        "Certified in core problem solving, algorithmic thinking, data structures, and Python implementations.",
      image: "/hackerrank_logo.png",
      links: [
        {
          title: "GitHub Profile",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Pradeepz01",
        },
      ],
    },
  ],
} as const;
