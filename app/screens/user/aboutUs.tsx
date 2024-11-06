import { ScrollView, StyleSheet, View } from "react-native";
import CustomText from "../../hook/customText";

const AboutUs = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomText style={styles.heading}>About Us</CustomText>
        <CustomText style={styles.aboutText}>Welcome to Gharbeti</CustomText>
        <CustomText style={styles.paragraph}>
          At Gharbeti, we believe that managing your home and finances should be
          as easy and stress-free as possible. Our app is designed to help
          renters and landlords navigate the complexities of rental agreements,
          payments, and communication in a seamless manner.
        </CustomText>

        <CustomText style={styles.heading}>Our Mission</CustomText>
        <CustomText style={styles.paragraph}>
          Our mission is to simplify the rental experience for both tenants and
          property owners. We strive to empower users with the tools they need
          to manage their rental obligations effectively while ensuring clear
          communication and transparency between all parties involved.
        </CustomText>

        <CustomText style={styles.heading}>What We Offer</CustomText>
        <CustomText style={styles.paragraph}>
          Rent Payment Reminders: Never miss a rent payment again! Our app sends
          timely notifications to remind you when your payments are due, so you
          can focus on what matters most.
        </CustomText>
        <CustomText style={styles.paragraph}>
          Secure Transactions: Gharbeti ensures that your transactions are safe
          and secure, giving you peace of mind when managing your finances.
        </CustomText>
        <CustomText style={styles.paragraph}>
          User-Friendly Interface: Our intuitive design makes it easy for anyone
          to navigate the app, whether you're tech-savvy or a first-time user.
        </CustomText>
        <CustomText style={styles.paragraph}>
          Comprehensive Support: We understand that questions can arise, which
          is why our dedicated support team is always ready to assist you with
          any inquiries.
        </CustomText>

        <CustomText style={styles.heading}>Our Vision</CustomText>
        <CustomText style={styles.paragraph}>
          Gharbeti envisions a future where managing rental properties is
          straightforward and efficient. By harnessing the power of technology,
          we aim to create a community where landlords and tenants can
          collaborate transparently and effectively.
        </CustomText>

        <CustomText style={styles.heading}>Join Us</CustomText>
        <CustomText style={styles.paragraph}>
          Join the Gharbeti family today and experience the future of rental
          management. Download the app and take control of your rental
          experience—because your home deserves the best!
        </CustomText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Optional: Add a subtle background color
  },
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Optional: Set a color for the headings
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15, // Space between paragraphs
    lineHeight: 22, // Line height for better readability
    color: "#555", // Optional: Set a color for the text
  },
  aboutText: {
    alignContent: "stretch",
  },
});

export default AboutUs;
