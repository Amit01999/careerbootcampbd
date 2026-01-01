import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const circularSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Circular title is required'],
      trim: true,
    },
    titleBn: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required'],
      trim: true,
      index: true,
    },
    bankNameBn: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    positionBn: {
      type: String,
      trim: true,
    },
    vacancies: {
      type: Number,
      min: 0,
    },
    jobType: {
      type: String,
      enum: ['full_time', 'part_time', 'contractual', 'intern'],
      default: 'full_time',
    },
    location: {
      divisions: [String], // All Bangladesh or specific divisions
      districts: [String],
      isNationwide: {
        type: Boolean,
        default: false,
      },
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'BDT',
      },
      isNegotiable: {
        type: Boolean,
        default: false,
      },
    },
    eligibility: {
      education: {
        degree: [String], // BSc, MSc, MBA, etc.
        major: [String],
        minimumCGPA: Number,
      },
      experience: {
        required: Boolean,
        minimumYears: Number,
        preferredSectors: [String],
      },
      ageLimit: {
        min: Number,
        max: Number,
      },
      otherRequirements: String,
      otherRequirementsBn: String,
    },
    applicationDeadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
      index: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    examDate: Date,
    interviewDate: Date,
    description: {
      type: String,
      required: true,
    },
    descriptionBn: {
      type: String,
    },
    responsibilities: [String],
    responsibilitiesBn: [String],
    benefits: [String],
    benefitsBn: [String],
    applicationProcess: {
      type: String,
      required: true,
    },
    applicationProcessBn: {
      type: String,
    },
    applicationLink: String,
    applicationEmail: String,
    contactInfo: {
      phone: String,
      email: String,
      address: String,
      website: String,
    },
    attachments: [{
      name: String,
      url: String,
      fileType: String,
      uploadedAt: Date,
    }],
    imageUrl: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'expired', 'cancelled'],
      default: 'published',
      index: true,
    },
    priority: {
      type: String,
      enum: ['normal', 'featured', 'urgent'],
      default: 'normal',
      index: true,
    },
    tags: [String],
    category: {
      type: String,
      enum: ['government', 'private', 'autonomous', 'foreign'],
      default: 'private',
    },
    source: {
      type: String,
      default: 'Official',
    },
    sourceUrl: String,
    stats: {
      views: {
        type: Number,
        default: 0,
      },
      saves: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
circularSchema.index({ status: 1, isActive: 1, publishedDate: -1 });
circularSchema.index({ bankName: 1, status: 1 });
circularSchema.index({ applicationDeadline: 1 });
circularSchema.index({ 'location.divisions': 1 });
circularSchema.index({ tags: 1 });
circularSchema.index({ priority: -1, publishedDate: -1 });

// Generate slug
circularSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('bankName')) {
    const slugText = `${this.bankName} ${this.position} ${Date.now()}`;
    this.slug = slugify(slugText, { lower: true, strict: true });
  }

  // Auto-expire if deadline passed
  if (new Date() > this.applicationDeadline && this.status === 'published') {
    this.status = 'expired';
  }

  next();
});

// Virtual for days remaining
circularSchema.virtual('daysRemaining').get(function () {
  const now = new Date();
  const deadline = new Date(this.applicationDeadline);
  const diff = deadline - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Instance method to check if expired
circularSchema.methods.isExpired = function () {
  return new Date() > this.applicationDeadline;
};

// Instance method to increment views
circularSchema.methods.incrementViews = async function () {
  this.stats.views += 1;
  return this.save();
};

// Static method to get active circulars with filters
circularSchema.statics.getActiveCirculars = async function (filters = {}, options = {}) {
  const {
    bankName, location, tags, priority, limit = 20, skip = 0,
  } = { ...filters, ...options };

  const query = {
    status: 'published',
    isActive: true,
    applicationDeadline: { $gte: new Date() },
  };

  if (bankName) query.bankName = new RegExp(bankName, 'i');
  if (location) query['location.divisions'] = location;
  if (tags && tags.length > 0) query.tags = { $in: tags };
  if (priority) query.priority = priority;

  return this.find(query)
    .sort({ priority: -1, publishedDate: -1 })
    .limit(limit)
    .skip(skip)
    .select('-__v');
};

const Circular = mongoose.model('Circular', circularSchema);

export default Circular;
