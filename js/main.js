(() => {
  const projects = {
    centremass: {
      title: "Centre Mass",
      text: "Self-balancing inverted pendulum robot centered on active PID control and electrical hardware integration. Built to maintain continuous equilibrium through real-time IMU sensing and dynamic motor control. Stack: Raspberry Pi with I2C motor control, MPU6050 IMU, L298N H-bridge with rotary encoders, and an LM2596 buck converter. Highlights include a tuned PID loop for center-of-gravity stability, a custom multi-tiered chassis, and power/signal routing between Pi logic and the drive system.",
      links: [],
    },
    signbridge: {
      title: "SignBridge",
      image: "images/signbridge-full.jpg",
      imageAlt:
        "SignBridge 3D-printed yellow ASL glasses with forward camera module",
      text: "Wearable smart glasses that translate American Sign Language into English in real time. Built at HackED 2026 with a 3D-printed frame, camera module, MediaPipe hand tracking, and a TensorFlow model—plus toggle logic for fingerspelling vs. full-word signs.",
      links: [
        {
          label: "SignBridge",
          href: "https://devpost.com/software/yeti-fc_asl-glasses",
        },
        {
          label: "GitHub",
          href: "https://github.com/harsituni/yeti-hacked",
        },
      ],
    },
    akipad: {
      title: "AkiPad V1",
      image: "images/akipad-full.jpg",
      imageAlt:
        "AkiPad V1 CAD model — six keys, dual encoders, and OLED cutout",
      text: "A compact engineering macropad with 6 custom keys, dual rotary encoders, a 0.91\" OLED, and RGB NeoPixel lighting. Designed the PCB and case in KiCAD, wrote the firmware in KMK, and packaged files for fabrication.",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Akileash/AkiPad-V1",
        },
      ],
    },
    website: {
      title: "Personal Website",
      image: "images/about-placeholder.svg",
      imageAlt: "Personal Website — AS monogram",
      text: "This portfolio site — a minimal multi-page layout with About, Projects, Contact, and Photography. Built with HTML, CSS, and JavaScript, including project detail popups and a responsive serif header.",
      links: [
        {
          label: "Open site",
          href: "index.html",
          external: false,
        },
      ],
    },
    syllasync: {
      title: "Sylla Sync",
      image: "images/syllasync-full.jpg",
      imageAlt:
        "Sylla Sync — Canvas to PDF to dashboard to Discord workflow",
      text: "Python automation tool that consolidates university coursework from Canvas LMS and syllabus PDFs into a single assignment tracker — exported to Google Sheets or Excel, with an optional Discord weekly digest. Pulls Canvas assignments, auto-downloads syllabus PDFs, parses deadlines with regex and Gemini AI fallback, and smart-merges into a tracker without wiping manual progress.",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Akileash/SyllaSync",
        },
      ],
    },
  };

  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const titleEl = modal.querySelector(".project-modal__title");
  const textEl = modal.querySelector(".project-modal__text");
  const linksEl = modal.querySelector(".project-modal__links");
  const mediaEl = modal.querySelector(".project-modal__media");
  const imgEl = modal.querySelector(".project-modal__img");
  let lastTrigger = null;

  const openModal = (key, trigger) => {
    const data = projects[key];
    if (!data) return;

    lastTrigger = trigger;
    titleEl.textContent = data.title;
    textEl.textContent = data.text;
    linksEl.innerHTML = "";
    linksEl.hidden = !data.links?.length;

    if (data.image) {
      imgEl.src = data.image;
      imgEl.alt = data.imageAlt || data.title;
      mediaEl.hidden = false;
      modal.classList.add("has-media");
    } else {
      imgEl.removeAttribute("src");
      imgEl.alt = "";
      mediaEl.hidden = true;
      modal.classList.remove("has-media");
    }

    data.links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      if (link.external !== false) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      linksEl.appendChild(a);
    });

    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
    });
    document.body.classList.add("is-locked");
    modal.querySelector(".project-modal__close")?.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    window.setTimeout(() => {
      if (!modal.classList.contains("is-open")) {
        modal.hidden = true;
        modal.classList.remove("has-media");
      }
    }, 280);
    lastTrigger?.focus();
  };

  document.querySelectorAll(".project-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.project, btn);
    });
  });

  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
