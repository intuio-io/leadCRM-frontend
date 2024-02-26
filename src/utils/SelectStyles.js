export const campaignClientSelectStyles = {
    styles: function (errors) {
        return {
            control: (baseStyles, state) => ({
                ...baseStyles,
                border: state.isFocused
                    ? "none"
                    : `1.9px solid ${errors ? "#ef4444" : "#e5e7eb"}`,
                height: "2.95rem",
            }),
        };
    },

    themes: function (theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#e0e7ff",
                primary: "#6366f1",
            },
        };
    },
};
