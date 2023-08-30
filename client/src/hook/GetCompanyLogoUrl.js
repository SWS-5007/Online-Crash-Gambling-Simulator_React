export const GetCompanyLogoUrl = (companyName) => {
  let lowercasedText = companyName.toLowerCase();

  let replacedText = lowercasedText.replace(/ /g, "-");

  let url_1 =
    "https://njuzsmnjptisqgwhzhcl.supabase.co/storage/v1/object/public/assets/logos/";

  let LogoUrl = url_1 + replacedText + ".svg";

  return LogoUrl;
};
