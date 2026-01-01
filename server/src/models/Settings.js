import mongoose from 'mongoose';

const { Schema } = mongoose;

const settingsSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    category: {
      type: String,
      enum: ['general', 'exam', 'payment', 'notification', 'email', 'sms', 'security', 'ui'],
      default: 'general',
      index: true,
    },
    description: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// Static method to get setting by key
settingsSchema.statics.get = async function (key, defaultValue = null) {
  const setting = await this.findOne({ key });
  return setting ? setting.value : defaultValue;
};

// Static method to set setting
settingsSchema.statics.set = async function (key, value, updatedBy = null) {
  return this.findOneAndUpdate(
    { key },
    { value, updatedBy, updatedAt: new Date() },
    { upsert: true, new: true },
  );
};

// Static method to get multiple settings
settingsSchema.statics.getMany = async function (keys) {
  const settings = await this.find({ key: { $in: keys } });
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
};

// Static method to get all public settings
settingsSchema.statics.getPublic = async function () {
  const settings = await this.find({ isPublic: true });
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
};

// Static method to get settings by category
settingsSchema.statics.getByCategory = async function (category) {
  const settings = await this.find({ category });
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
