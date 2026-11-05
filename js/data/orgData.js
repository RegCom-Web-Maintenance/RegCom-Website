/**
 * ============================================================================
 * REGCOM ORGANIZATION DATA (S.Y. 2026-2027)
 * ============================================================================
 * Future Maintainers:
 * Edit this file to update the Executive Committee, Branches, Sub-Branches,
 * Heads, or Important Links.
 */

export const orgData = {
  academicYear: "First Semester S.Y. 2026–2027",
  name: "Ateneo Registration Committee",
  shortName: "RegCom",
  tagline: "Service. Volunteerism. Discipline. Commitment.",
  about:
    "RegCom is a body of selected student volunteers tasked by the Office of the University Registrar (OUR) to enforce and facilitate the registration process and assist all academic departments, administrative offices, personnel, and students involved in it. Reorganized during 2020–2021 to strengthen online presence and technical support, RegCom continues to serve the Ateneo Higher Education Community with dedication and care.",

  coreValues: [
    {
      title: "Service",
      icon: "heart-handshake",
      description: "Assisting students, departments, and the Registrar's Office with patience and a smile behind the screen."
    },
    {
      title: "Volunteerism",
      icon: "users",
      description: "Stepping up willingly as student volunteers to make registration smoother for every Atenista."
    },
    {
      title: "Discipline",
      icon: "shield-check",
      description: "Upholding strict data privacy, punctuality, and professionalism across all shifts and channels."
    },
    {
      title: "Commitment",
      icon: "award",
      description: "Ensuring every inquiry is resolved and the community stays informed throughout enlistment."
    }
  ],

  exeCom: [
    {
      name: "Anselmo Benedict Condat",
      yearCourse: "4 AB PSY",
      role: "RegCom Head",
      phone: "+63 975 085 0680",
      email: "anselmo.condat@student.ateneo.edu",
      avatarInitials: "AC"
    },
    {
      name: "Andrea Danielle Tabberrah",
      yearCourse: "4 BS HS",
      role: "Secretariat Head",
      phone: "+63 917 593 9726",
      email: "andrea.tabberrah@student.ateno.edu",
      avatarInitials: "AT"
    },
    {
      name: "Joaquin Miguel Tiglao",
      yearCourse: "4 BS PSY",
      role: "Logistics Head",
      phone: "+63 970 196 8385",
      email: "joaquin.tiglao@student.ateneo.edu",
      avatarInitials: "JT"
    },
    {
      name: "Athea June Charlotte Isnani",
      yearCourse: "4 AB PSY",
      role: "Assessment Supervisor",
      phone: "+63 976 161 6011",
      email: "athea.isnani@student.ateneo.edu",
      avatarInitials: "AI"
    }
  ],

  branches: [
    {
      id: "hr",
      name: "Human Resources (HR)",
      supervisor: "Supervised by the RegCom Head",
      subBranches: [
        {
          id: "membership",
          name: "Membership",
          supervisor: "RegCom Head",
          summary: "Preserves order within the organization, evaluates demeanor and performance, monitors attendance, and manages member documents.",
          heads: [
            {
              name: "Aliyah Carmen Michelle Herlihy",
              yearCourse: "4 AB Dip-IR",
              email: "aliyah.carmen.herlihy@student.ateneo.edu",
              phone: "+63 998 883 5911"
            },
            {
              name: "Kirsten Kate Aizpuru",
              yearCourse: "4 BS ES",
              email: "kirsten.aizpuru@student.ateneo.edu",
              phone: "+63 948 269 1124"
            }
          ]
        },
        {
          id: "welfare",
          name: "Welfare",
          supervisor: "RegCom Head",
          summary: "Oversees member growth and well-being through Group Dynamics, RegCom-ustahan consultations, Revisi Beban, and Seniors' Send-Off.",
          heads: [
            {
              name: "Zandre Managbanag",
              yearCourse: "3 BS EcE",
              email: "zandre.managbanag@student.ateneo.edu",
              phone: "+63 960 293 4669"
            }
          ]
        }
      ]
    },
    {
      id: "promos",
      name: "Promos",
      supervisor: "Supervised by the Logistics Head",
      subBranches: [
        {
          id: "creatives",
          name: "Creatives",
          supervisor: "Logistics Head",
          summary: "Designs coherent promotional materials (PubMats), templates, and icon banks to keep the Ateneo community informed.",
          heads: [
            {
              name: "Kirsten Kyle Paras",
              yearCourse: "4 BS LFSCI",
              email: "kirsten.paras@student.ateneo.edu",
              phone: "+63 908 440 0231"
            }
          ]
        },
        {
          id: "socmed",
          name: "Social Media Managers",
          supervisor: "Logistics Head",
          summary: "Manages copywriting, scheduling, and announcements on RegCom's Helpdesk (Facebook) and @ateneoregcom (Instagram).",
          heads: [
            {
              name: "Tashannah Doller",
              yearCourse: "3 BS MIS",
              email: "tashannah.doller@student.ateneo.edu",
              phone: "+63 933 814 4892"
            }
          ]
        }
      ]
    },
    {
      id: "web",
      name: "Web",
      supervisor: "Supervised by the Secretariat Head & Assessment Supervisor",
      subBranches: [
        {
          id: "web-maintenance",
          name: "Web Maintenance",
          supervisor: "Assessment Supervisor",
          summary: "Develops and maintains digital systems, databases, automations, and workflows while serving as SOICs during workdays.",
          heads: [
            {
              name: "Martin Angelo M. Funelas",
              yearCourse: "4 BS CS",
              email: "martin.funelas@student.ateneo.edu",
              phone: "+63 908 505 7072"
            }
          ]
        },
        {
          id: "wic",
          name: "Web Information Collection (WIC)",
          supervisor: "Secretariat Head",
          summary: "Collates and verifies departmental registration policies, maintains the HE Directory, and mans the Helpdesk & DIO channels.",
          heads: [
            {
              name: "Julia Ira Rojo",
              yearCourse: "3 BS ME",
              email: "julia.ira.rojo@student.ateneo.edu",
              phone: "+63 945 413 7387"
            }
          ]
        }
      ]
    }
  ],

  importantLinks: [
    {
      title: "RegCom Manual (Interactive)",
      category: "Internal Handbook",
      description: "Searchable on-page guide for sub-branch SOPs, attendance rules, letter templates, and FAQs.",
      actionText: "Open Manual Viewer",
      url: "#manual-modal",
      isModal: true
    },
    {
      title: "Official RegCom Manual (PDF)",
      category: "Google Drive Document",
      description: "View or download the full First Semester S.Y. 2026–2027 Manual PDF on Google Drive.",
      actionText: "View Manual PDF ↗",
      url: "https://drive.google.com/file/d/1H2wyFw6DNjLAHRkrEPgHSg8_-xy2UDPp/view?usp=drive_link",
      isExternal: true
    },
    {
      title: "Higher Education Directory",
      category: "Official Database",
      description: "Directory of ADMU academic departments, offices, contacts, and registration instructions.",
      actionText: "Open HE Directory ↗",
      url: "https://bit.ly/HEDirectory",
      isExternal: true
    },
    {
      title: "RegCom's Helpdesk",
      category: "Facebook Page",
      description: "Official communication channel and student inquiry helpdesk on Facebook.",
      actionText: "Visit Facebook Page ↗",
      url: "https://www.facebook.com/RegComHelpdesk",
      isExternal: true
    }
  ],

  communityMoments: [
    {
      image: "assets/wacky.jpg",
      alt: "RegCom Wacky",
      tilt: "1.2deg"
    },
    {
      image: "assets/jollibee.jpg",
      alt: "RegCom Jollibee Party",
      tilt: "-1.5deg"
    },
    {
      image: "assets/escaperoom.jpg",
      alt: "RegCom Escape Room",
      tilt: "-1deg"
    }
  ]
};
