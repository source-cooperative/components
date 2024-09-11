import {
  Box,
  Container,
  Grid,
  Heading,
  Paragraph,
  Input,
  Select,
  Text,
  Alert,
} from "theme-ui";
import SourceButton from "@/components/Button";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Dimmer } from "@carbonplan/components";
import { Logo } from "@/components/Logo";
import { Configuration, FrontendApi } from "@ory/client";
import { useState, useEffect } from "react";
import {
  AccountCreationRequest,
  AccountCreationRequestSchema,
  AccountType,
} from "@/api/types";

const frontend = new FrontendApi(
  new Configuration({
    basePath: `${process.env.NEXT_PUBLIC_BASE_URL}/api/.ory`,
  })
);

const COUNTRIES = [
  { value: "Somewhere On Planet Earth", label: "Somewhere On Planet Earth" },
  { value: "United States", label: "United States" },
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Åland Islands", label: "Åland Islands" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Anguilla", label: "Anguilla" },
  { value: "Antarctica", label: "Antarctica" },
  { value: "Antigua & Barbuda", label: "Antigua & Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Aruba", label: "Aruba" },
  { value: "Ascension Island", label: "Ascension Island" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bermuda", label: "Bermuda" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia & Herzegovina", label: "Bosnia & Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  {
    value: "British Indian Ocean Territory",
    label: "British Indian Ocean Territory",
  },
  { value: "British Virgin Islands", label: "British Virgin Islands" },
  { value: "Brunei", label: "Brunei" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Canary Islands", label: "Canary Islands" },
  { value: "Cape Verde", label: "Cape Verde" },
  { value: "Caribbean Netherlands", label: "Caribbean Netherlands" },
  { value: "Cayman Islands", label: "Cayman Islands" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Ceuta & Melilla", label: "Ceuta & Melilla" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Christmas Island", label: "Christmas Island" },
  { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo - Brazzaville", label: "Congo - Brazzaville" },
  { value: "Congo - Kinshasa", label: "Congo - Kinshasa" },
  { value: "Cook Islands", label: "Cook Islands" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Côte d’Ivoire", label: "Côte d’Ivoire" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Curaçao", label: "Curaçao" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czechia", label: "Czechia" },
  { value: "Denmark", label: "Denmark" },
  { value: "Diego Garcia", label: "Diego Garcia" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Falkland Islands", label: "Falkland Islands" },
  { value: "Faroe Islands", label: "Faroe Islands" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "French Guiana", label: "French Guiana" },
  { value: "French Polynesia", label: "French Polynesia" },
  {
    value: "French Southern Territories",
    label: "French Southern Territories",
  },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Gibraltar", label: "Gibraltar" },
  { value: "Greece", label: "Greece" },
  { value: "Greenland", label: "Greenland" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guadeloupe", label: "Guadeloupe" },
  { value: "Guam", label: "Guam" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guernsey", label: "Guernsey" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  { value: "Honduras", label: "Honduras" },
  { value: "Hong Kong SAR China", label: "Hong Kong SAR China" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Isle of Man", label: "Isle of Man" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jersey", label: "Jersey" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  { value: "Kosovo", label: "Kosovo" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  { value: "Laos", label: "Laos" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libya", label: "Libya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Macao SAR China", label: "Macao SAR China" },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Martinique", label: "Martinique" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mayotte", label: "Mayotte" },
  { value: "Mexico", label: "Mexico" },
  { value: "Micronesia", label: "Micronesia" },
  { value: "Moldova", label: "Moldova" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar (Burma)", label: "Myanmar (Burma)" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Caledonia", label: "New Caledonia" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Niue", label: "Niue" },
  { value: "Norfolk Island", label: "Norfolk Island" },
  { value: "North Korea", label: "North Korea" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  { value: "Palestinian Territories", label: "Palestinian Territories" },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Pitcairn Islands", label: "Pitcairn Islands" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Pseudo-Accents", label: "Pseudo-Accents" },
  { value: "Pseudo-Bidi", label: "Pseudo-Bidi" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "Qatar", label: "Qatar" },
  { value: "Réunion", label: "Réunion" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "São Tomé & Príncipe", label: "São Tomé & Príncipe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Sint Maarten", label: "Sint Maarten" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  {
    value: "South Georgia & South Sandwich Islands",
    label: "South Georgia & South Sandwich Islands",
  },
  { value: "South Korea", label: "South Korea" },
  { value: "South Sudan", label: "South Sudan" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "St. Barthélemy", label: "St. Barthélemy" },
  { value: "St. Helena", label: "St. Helena" },
  { value: "St. Kitts & Nevis", label: "St. Kitts & Nevis" },
  { value: "St. Lucia", label: "St. Lucia" },
  { value: "St. Martin", label: "St. Martin" },
  { value: "St. Pierre & Miquelon", label: "St. Pierre & Miquelon" },
  { value: "St. Vincent & Grenadines", label: "St. Vincent & Grenadines" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Svalbard & Jan Mayen", label: "Svalbard & Jan Mayen" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syria", label: "Syria" },
  { value: "Taiwan", label: "Taiwan" },
  { value: "Tajikistan", label: "Tajikistan" },
  { value: "Tanzania", label: "Tanzania" },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-Leste", label: "Timor-Leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tokelau", label: "Tokelau" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad & Tobago", label: "Trinidad & Tobago" },
  { value: "Tristan da Cunha", label: "Tristan da Cunha" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Turks & Caicos Islands", label: "Turks & Caicos Islands" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "U.S. Outlying Islands", label: "U.S. Outlying Islands" },
  { value: "U.S. Virgin Islands", label: "U.S. Virgin Islands" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Vatican City", label: "Vatican City" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Wallis & Futuna", label: "Wallis & Futuna" },
  { value: "Western Sahara", label: "Western Sahara" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

export async function createAccount(
  accountCreationRequest: AccountCreationRequest
): Promise<null> {
  console.log(accountCreationRequest);
  return null;
}

export default function AccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountCreationRequest>({
    resolver: zodResolver(AccountCreationRequestSchema),
    defaultValues: {
      account_type: AccountType.USER,
    },
  });

  const onSubmit: SubmitHandler<AccountCreationRequest> = (data) => {
    setSubmitting(true);
    fetch(`/api/v1/accounts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        router.push(`/${data.account_id}`);
      } else {
        res.json().then((data) => {
          setErrorMessage(data.message);
        });
        setSubmitting(false);
      }
    });
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [logoutUrl, setLogoutUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    frontend.createBrowserLogoutFlow().then((res) => {
      setLogoutUrl(res.data.logout_url);
    });
  }, []);

  return (
    <Container
      sx={{
        width: ["100%", "80%", "50%", "40%"],
        maxWidth: "500px",
        py: 5,
        textAlign: "center",
      }}
    >
      <Box sx={{ alignItems: "center", textAlign: "center" }}>
        <Link href="/">
          <Logo
            sx={{
              width: "100%",
              fill: "background",
              backgroundColor: "primary",
              p: 3,
            }}
          />
        </Link>
      </Box>
      {errorMessage ? <Alert variant={"error"}>{errorMessage}</Alert> : <></>}
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          sx={{
            gridTemplateColumns: [],
          }}
        >
          <Heading as="h1" sx={{ mb: 0 }}>
            Welcome!
          </Heading>
          <Paragraph sx={{ mt: 0 }}>
            Before you get started, we need to complete your account
            registration. This will only take a minute.
          </Paragraph>

          <Heading as="h2" sx={{ mb: 0 }}>
            Choose a Username
          </Heading>

          <Box sx={{ textAlign: "left" }}>
            <Text sx={{ fontFamily: "mono", fontSize: 0 }}>Username</Text>
            <Input {...register("account_id")} />
            <Text sx={{ fontFamily: "mono", fontSize: 0, color: "red" }}>
              {errors.account_id?.message}
            </Text>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Paragraph sx={{ my: 0, fontFamily: "mono", fontSize: 0 }}>
              Usernames must meet the following criteria:
            </Paragraph>
            <Paragraph sx={{ my: 0, fontFamily: "mono", fontSize: 0 }}>
              • Between 3 and 40 characters in length
            </Paragraph>
            <Paragraph sx={{ my: 0, fontFamily: "mono", fontSize: 0 }}>
              • Contain only letters, numbers, and hyphens
            </Paragraph>
            <Paragraph sx={{ my: 0, fontFamily: "mono", fontSize: 0 }}>
              • Must not start or end with a hyphen
            </Paragraph>
            <Paragraph sx={{ my: 0, fontFamily: "mono", fontSize: 0 }}>
              • Must not contain consecutive hyphens
            </Paragraph>
          </Box>

          <Heading as="h2" sx={{ mb: 0 }}>
            Fill out Your Profile
          </Heading>
          <Paragraph sx={{ mt: 0 }}>
            You can fill out your profile information later if you'd like.
          </Paragraph>

          <Box sx={{ textAlign: "left" }}>
            <Text sx={{ fontFamily: "mono", fontSize: 0 }}>Name</Text>
            <Input {...register("profile.name")} />
            <Text sx={{ fontFamily: "mono", fontSize: 0, color: "red" }}>
              {errors.profile?.name?.message}
            </Text>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Text sx={{ fontFamily: "mono", fontSize: 0 }}>Bio</Text>
            <Input {...register("profile.bio")} />
            <Text sx={{ fontFamily: "mono", fontSize: 0, color: "red" }}>
              {errors.profile?.bio?.message}
            </Text>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Text sx={{ fontFamily: "mono", fontSize: 0 }}>Location</Text>
            <Select {...register("profile.location")}>
              {COUNTRIES.map((country, i) => (
                <option key={`country-${i}`}>{country.value}</option>
              ))}
            </Select>
            <Text sx={{ fontFamily: "mono", fontSize: 0, color: "red" }}>
              {errors.profile?.location?.message}
            </Text>
          </Box>

          <Box sx={{ textAlign: "left" }}>
            <Text sx={{ fontFamily: "mono", fontSize: 0 }}>Website</Text>
            <Input {...register("profile.url")} />
            <Text sx={{ fontFamily: "mono", fontSize: 0, color: "red" }}>
              {errors.profile?.url?.message}
            </Text>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <SourceButton disabled={submitting}>
              {submitting ? "Submitting..." : "Complete Registration"}
            </SourceButton>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <SourceButton disabled={!logoutUrl} href={logoutUrl}>
              Log Out
            </SourceButton>
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          display: ["none", "none", "initial", "initial"],
          position: ["fixed"],
          right: [13],
          bottom: [17, 17, 15, 15],
        }}
      >
        <Dimmer />
      </Box>
    </Container>
  );
}
