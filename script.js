/* =========================================================
   ABSENSI SISWA - MAD7XSIGMA
========================================================= */


/* =========================================================
   WHATSAPP GROUP
========================================================= */

const GROUP_URL =
    "https://chat.whatsapp.com/Fbk0gIDWokm39O0m1JB28a?s=cl&p=a&mlu=4&iam=2";


/* =========================================================
   ELEMENTS
========================================================= */

const form =
    document.getElementById("attendanceForm");

const nameInput =
    document.getElementById("name");

const statusCards =
    document.querySelectorAll(".status-card");

const submitBtn =
    document.getElementById("submitBtn");

const modal =
    document.getElementById("modal");

const messagePreview =
    document.getElementById("messagePreview");

const copyBtn =
    document.getElementById("copyBtn");

const openWhatsapp =
    document.getElementById("openWhatsapp");

const closeModal =
    document.getElementById("closeModal");

const closeModalX =
    document.getElementById("closeModalX");

const toast =
    document.getElementById("toast");

const particleContainer =
    document.getElementById("particles");


/* =========================================================
   STATE
========================================================= */

let selectedStatus = null;

let generatedMessage = "";

let toastTimer = null;


/* =========================================================
   PARTICLES
========================================================= */

if (particleContainer) {

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (6 + Math.random() * 9) + "s";

        particle.style.animationDelay =
            (-Math.random() * 12) + "s";

        particle.style.opacity =
            0.2 + Math.random() * 0.8;

        const size =
            1 + Math.random() * 2.5;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particleContainer.appendChild(
            particle
        );
    }
}


/* =========================================================
   STATUS SELECTION
========================================================= */

statusCards.forEach(card => {

    card.addEventListener("click", () => {

        statusCards.forEach(item => {

            item.classList.remove(
                "selected"
            );

        });

        card.classList.add(
            "selected"
        );

        selectedStatus =
            card.dataset.status;


        /* Small click animation */

        card.animate(
            [
                {
                    transform: "scale(.96)"
                },
                {
                    transform: "scale(1.035)"
                },
                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 280,
                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );

    });

});


/* =========================================================
   DATE
========================================================= */

function getCurrentDate() {

    const now =
        new Date();

    const day =
        now.getDate();

    const month =
        now.getMonth() + 1;

    const year =
        now.getFullYear();

    return `${day}/${month}/${year}`;
}


/* =========================================================
   TIME
========================================================= */

function getCurrentTime() {

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    return `${hours}.${minutes}.${seconds} WIB`;
}


/* =========================================================
   CREATE MESSAGE
========================================================= */

function createMessage(
    name,
    status
) {

    return `*ABSENSI SISWA - MAD7XSIGMA*

*Nama:* ${name}
*Status:* ${status}
*Tanggal:* ${getCurrentDate()}
*Waktu:* ${getCurrentTime()}

_Dikirim dari website absensi_`;

}


/* =========================================================
   COPY MESSAGE
========================================================= */

async function copyMessage() {

    if (!generatedMessage) {
        return false;
    }


    /* Modern Clipboard API */

    try {

        await navigator.clipboard.writeText(
            generatedMessage
        );

        return true;

    } catch (error) {

        console.warn(
            "Clipboard API gagal.",
            error
        );

    }


    /* Fallback */

    try {

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value =
            generatedMessage;

        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";

        textarea.style.top =
            "0";

        textarea.style.opacity =
            "0";

        document.body.appendChild(
            textarea
        );

        textarea.focus();

        textarea.select();

        const result =
            document.execCommand(
                "copy"
            );

        textarea.remove();

        return result;

    } catch (error) {

        console.error(
            "Fallback clipboard gagal:",
            error
        );

        return false;
    }
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2300);
}


/* =========================================================
   MODAL
========================================================= */

function showModal() {

    if (!modal) {
        return;
    }

    modal.classList.add(
        "show"
    );
}


function hideModal() {

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "show"
    );
}


/* =========================================================
   VALIDATION ANIMATION
========================================================= */

function shake(element) {

    if (!element) {
        return;
    }

    element.animate(
        [
            {
                transform:
                    "translateX(0)"
            },
            {
                transform:
                    "translateX(-7px)"
            },
            {
                transform:
                    "translateX(7px)"
            },
            {
                transform:
                    "translateX(-5px)"
            },
            {
                transform:
                    "translateX(5px)"
            },
            {
                transform:
                    "translateX(0)"
            }
        ],
        {
            duration: 350
        }
    );
}


/* =========================================================
   SUBMIT
========================================================= */

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        /* NAME */

        const name =
            nameInput.value
                .trim()
                .replace(/\s+/g, " ");


        if (!name) {

            nameInput.focus();

            shake(
                nameInput.parentElement
            );

            showToast(
                "Masukkan nama terlebih dahulu"
            );

            return;
        }


        /* STATUS */

        if (!selectedStatus) {

            shake(
                document.querySelector(
                    ".status-grid"
                )
            );

            showToast(
                "Pilih status kehadiran"
            );

            return;
        }


        /* =================================================
           CREATE MESSAGE
        ================================================= */

        generatedMessage =
            createMessage(
                name,
                selectedStatus
            );


        /* =================================================
           UPDATE PREVIEW
        ================================================= */

        if (messagePreview) {

            messagePreview.textContent =
                generatedMessage;

        }


        /* =================================================
           COPY MESSAGE
        ================================================= */

        const copied =
            await copyMessage();


        if (copied) {

            showToast(
                "Pesan disalin ✓"
            );

        }


        /* =================================================
           SUBMIT ANIMATION
        ================================================= */

        if (submitBtn) {

            submitBtn.disabled =
                true;

            const originalText =
                submitBtn.querySelector(
                    ".submit-text"
                );

            if (originalText) {

                originalText.textContent =
                    "Membuka WhatsApp...";

            }

            submitBtn.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(.96)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 300
                }
            );

        }


        /* =================================================
           IMPORTANT:
           LANGSUNG REDIRECT KE WHATSAPP
        ================================================= */

        setTimeout(() => {

            window.location.href =
                GROUP_URL;

        }, 350);

    }
);


/* =========================================================
   COPY BUTTON
========================================================= */

if (copyBtn) {

    copyBtn.addEventListener(
        "click",
        async () => {

            const copied =
                await copyMessage();

            if (copied) {

                copyBtn.textContent =
                    "✓ Tersalin";

                showToast(
                    "Pesan berhasil disalin ✓"
                );

                setTimeout(() => {

                    copyBtn.textContent =
                        "Salin Pesan";

                }, 1800);

            } else {

                showToast(
                    "Gagal menyalin pesan"
                );

            }

        }
    );

}


/* =========================================================
   WHATSAPP BUTTON
========================================================= */

if (openWhatsapp) {

    openWhatsapp.addEventListener(
        "click",
        async () => {

            /* Pastikan pesan tersalin */

            await copyMessage();

            /* Langsung navigasi */

            window.location.href =
                GROUP_URL;

        }
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        hideModal
    );

}


if (closeModalX) {

    closeModalX.addEventListener(
        "click",
        hideModal
    );

}


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                hideModal();

            }

        }
    );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            hideModal();

        }

    }
);


/* =========================================================
   INPUT CLEANUP
========================================================= */

nameInput.addEventListener(
    "input",
    () => {

        nameInput.value =
            nameInput.value
                .replace(/\s{2,}/g, " ");

    }
);


/* =========================================================
   READY
========================================================= */

console.log(
    "%c ABSENSI SISWA ",
    "background:#27ee91;color:#03150d;padding:7px 12px;border-radius:7px;font-weight:bold;"
);

console.log(
    "System Ready ✓"
);

console.log(
    "WhatsApp Group:",
    GROUP_URL
);
